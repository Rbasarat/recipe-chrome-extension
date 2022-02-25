import { ChromeMessage, Sender } from "../types";
import "./content.css"
type MessageResponse = (response?: any) => void

const validateSender = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender
) => {
    return sender.id === chrome.runtime.id && message.from === Sender.React;
}

const MOUSE_VISITED_CLASSNAME = 'mouse_visited';

const messagesFromReactAppListener = (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    response: MessageResponse
) => {
    const isValidated = validateSender(message, sender);
    console.log("messagereact")
    if (isValidated) {
        return response("validated")
    }
}

const toggleHighlightListener = (
    enable: boolean,
) => {
    console.log("togglehighlight")
    if(enable){
        document.body.addEventListener('mouseover', highlight)
        document.body.addEventListener('mouseout', removeHighlight)
        document.body.addEventListener('click', (e: Event) => {
            chrome.runtime.sendMessage({greeting: "hello"},(response) => {
                console.log(response)
            });
        })
    }else{
        document.body.removeEventListener('mouseover', highlight)
        document.body.removeEventListener('mouseout', removeHighlight)
    }
}

const highlight = (e: Event) => {
    var element = e.target as HTMLElement
    if(element){        
        element.classList.add(MOUSE_VISITED_CLASSNAME);
    }
}
const removeHighlight = (e: Event) => {
    var element = e.target as HTMLElement
    if(element){        
        element.classList.remove(MOUSE_VISITED_CLASSNAME);
    }
}
const sendHTMLOnClick = (e: Event) => {
    e.preventDefault()
    var element = e.target as HTMLElement
    console.log("sending from content")

    chrome.runtime.sendMessage(
        "foo",
        function (response) {
            console.log(response);
        }
    );
    
    
}

const main = () => {
    console.log('[content.ts] Main')
    /**
     * Fired when a message is sent from either an extension process or a content script.
     */
    chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
    chrome.runtime.onMessage.addListener(toggleHighlightListener);
}

main();


