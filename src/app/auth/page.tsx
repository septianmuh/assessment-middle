import Page from "./page.client";
import { Provider } from "./provider";

export default function LoginPage(){
    return (
        <Provider>
            <Page></Page>
        </Provider>
    )
}