import { TemplateRef, Type } from '@angular/core';

export function createProjectableNode(content: string | TemplateRef<any> | Type<any> = ''): Node[] {
  if (typeof content === 'string') {
    return [this.renderer.createText(content)];
  }

  if (content instanceof TemplateRef) {
    return this.vcRef.createEmbeddedView(content, this.context).rootNodes;
  }

  const factory = this.resolver.resolveComponentFactory(content);
  const {
    location: { nativeElement },
  } = factory.create(this.injector);
  return [nativeElement];
}
