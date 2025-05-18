import type IDirective from "../interfaces/IDirective";

export class GlobalDirectivesStore{
    private static globalDirectives : Record<string, IDirective> = {}
    
    static getDirectives() : IDirective[] {
        return Object.values(this.globalDirectives)
    }

    static addDirective(directive : IDirective) : void {
        this.globalDirectives[directive.id] = directive
        window.dispatchEvent(new Event('newglobaldirective'))
    }
}