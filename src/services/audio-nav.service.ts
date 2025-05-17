import type IDirective from "../interfaces/IDirective";

export default class AudioNavService{
    private static navDirectives: Record<string, string> = {};
    private static globalDirectives : IDirective[] = []

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
        console.log("global")
        this.globalDirectives.push(directive)
    }
    
    static getAllGlobalDirectives() : IDirective[]{
        return this.globalDirectives
    }
}