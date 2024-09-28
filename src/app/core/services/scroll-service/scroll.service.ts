import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  /**
   * Handles scrolling to a fragment after navigation
   * @param router
   */
  constructor(private router: Router) {
    // Listen for navigation end events
    // When a navigation end event is received, check if there is a fragment in the url
    // If there is a fragment, scroll to the element with the matching id
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        const fragment = url.split('#')[1];
        if (fragment) {
          this.scrollToFragment(fragment);
        }
      });
  }

  /**
   * Scrolls to an element with the matching id
   * @param fragment
   */
  scrollToFragment(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
