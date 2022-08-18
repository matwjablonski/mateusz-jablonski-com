import { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const CaptchaProvider = ({ children }: { children: ReactNode }) => (
    <GoogleReCaptchaProvider
        reCaptchaKey="6LdvY1YhAAAAAOpn2TQ36DH94hTnsFGVQzlHQgx9"
        scriptProps={{
            async: false,
            defer: false,
            appendTo: "head",
            nonce: undefined,
        }}
    >
        {children}
    </GoogleReCaptchaProvider>
);

export default CaptchaProvider;
