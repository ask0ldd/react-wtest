export default class NavDirectivesStore{
    
    private static navDirectives: Record<string, string> = {}

    static getDirectives() : Record<string, string>{
        return this.navDirectives;
    }

    static addDirective(sentences: string[], url: string): void {
        sentences.forEach(sentence => {
            if (sentence in this.navDirectives) return
            this.navDirectives[sentence] = url
        })
        window.dispatchEvent(new Event('newnavdirective'))
    }
}