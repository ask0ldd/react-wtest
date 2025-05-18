import type IDirective from "../interfaces/IDirective";

export default class AudioNavService{
    private static navDirectives: Record<string, string> = {}
    private static globalDirectives : Record<string, IDirective> = {}

    static addNavDirective(sentences: string[], url: string): void {
        sentences.forEach(sentence => {
            if (sentence in this.navDirectives) return
            this.navDirectives[sentence] = url
        })
    }

    static getAllNavDirectives(): Record<string, string> {
        return this.navDirectives;
    }

    // should be grouped by urls
    static addGlobalDirective(directive : IDirective){
        /*console.log("global")
        const directiveIds = AudioNavService.getAllGlobalDirectives().map(directive => directive.id)
        if(!directiveIds.includes(directive.id)) this.globalDirectives.push(directive)*/
        this.globalDirectives[directive.id] = directive
        // window.dispatchEvent(new Event('newdirective'))
    }
    
    static getAllGlobalDirectives() : IDirective[]{
        return Object.values(this.globalDirectives)
    }
}