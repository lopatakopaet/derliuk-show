import { DOCUMENT } from '@angular/common';
import {
  Directive,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[portalTo]',
})
export class PortalToDirective implements OnInit, OnDestroy {
  @Input() portalTo?: string | null;

  private host?: Element | null;
  private portalIds:string[] = [];

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const viewRef = this.vcr.createEmbeddedView(this.tpl);
    if (this.portalTo) {
      this.host = this.document.querySelector(this.portalTo);
    }

    viewRef.rootNodes.forEach((node: HTMLElement) => {
      const portalId = new Date().getTime() + '';
      node.setAttribute('portal-id', portalId);
      this.portalIds.push(portalId);
      if (this.host) {
        this.host.appendChild(node);
      }
    });
  }

  ngOnDestroy() {
    this.portalIds.forEach((portalId) => {
      // @ts-ignore: error message
      this.document.querySelector(`[portal-id="${portalId}"]`).remove();
    });
  }
}
