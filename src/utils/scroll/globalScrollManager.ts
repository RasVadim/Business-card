/**
 * Global scroll container manager that handles container detection across page transitions
 * and provides a centralized way to manage scroll listeners
 */

type ScrollListener = () => void;

class GlobalScrollManager {
  private currentContainer: Element | null = null;
  private listeners: Set<ScrollListener> = new Set();
  private observer: MutationObserver | null = null;
  private detectionTimeout: number | null = null;
  private isSetup = false;

  private readonly DETECTION_DELAY = 100;

  constructor() {
    this.setupContainerDetection();
  }

  /**
   * Sets up the global scroll container detection
   */
  private setupContainerDetection(): void {
    if (this.isSetup) return;

    this.isSetup = true;
    this.startObserving();
    this.detectContainer();
  }

  /**
   * Starts observing DOM changes for new scroll containers
   */
  private startObserving(): void {
    this.observer = new MutationObserver(() => {
      this.scheduleContainerDetection();
    });

    // Observe the entire document for changes
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-scroll-container'],
    });
  }

  /**
   * Schedules container detection with a delay to account for animations
   */
  private scheduleContainerDetection(): void {
    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
    }

    this.detectionTimeout = setTimeout(() => {
      this.detectContainer();
    }, this.DETECTION_DELAY);
  }

  /**
   * Detects and sets up the current scroll container
   */
  private detectContainer(): void {
    const newContainer = document.querySelector('[data-scroll-container="true"]');

    if (newContainer && newContainer !== this.currentContainer) {
      this.setupNewContainer(newContainer);
    }
  }

  /**
   * Sets up a new scroll container and migrates listeners
   */
  private setupNewContainer(container: Element): void {
    // Remove listeners from old container
    this.removeAllListeners();

    // Set new container
    this.currentContainer = container;

    // Re-add all listeners to new container
    this.addAllListeners();

    // Notify about container change
    this.notifyContainerChange();
  }

  /**
   * Removes all scroll listeners from current container
   */
  private removeAllListeners(): void {
    if (this.currentContainer) {
      this.listeners.forEach((listener) => {
        this.currentContainer!.removeEventListener('scroll', listener);
      });
    }
  }

  /**
   * Adds all scroll listeners to current container
   */
  private addAllListeners(): void {
    if (this.currentContainer) {
      this.listeners.forEach((listener) => {
        this.currentContainer!.addEventListener('scroll', listener);
      });
    }
  }

  /**
   * Notifies about container change (can be used for debugging)
   */
  private notifyContainerChange(): void {
    console.log('Scroll container changed:', this.currentContainer);
  }

  /**
   * Adds a scroll listener to the current container
   */
  addScrollListener(listener: ScrollListener): void {
    this.listeners.add(listener);

    if (this.currentContainer) {
      this.currentContainer.addEventListener('scroll', listener);
    }
  }

  /**
   * Removes a scroll listener
   */
  removeScrollListener(listener: ScrollListener): void {
    this.listeners.delete(listener);

    if (this.currentContainer) {
      this.currentContainer.removeEventListener('scroll', listener);
    }
  }

  /**
   * Gets the current scroll container
   */
  getCurrentContainer(): Element | null {
    return this.currentContainer;
  }

  /**
   * Gets the current scroll position
   */
  getScrollPosition(): number {
    return this.currentContainer?.scrollTop || 0;
  }

  /**
   * Forces container detection (useful after page transitions)
   */
  forceDetection(): void {
    this.scheduleContainerDetection();
  }

  /**
   * Cleans up the global manager
   */
  cleanup(): void {
    this.removeAllListeners();

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.detectionTimeout) {
      clearTimeout(this.detectionTimeout);
      this.detectionTimeout = null;
    }

    this.currentContainer = null;
    this.listeners.clear();
    this.isSetup = false;
  }
}

// Create singleton instance
export const globalScrollManager = new GlobalScrollManager();
