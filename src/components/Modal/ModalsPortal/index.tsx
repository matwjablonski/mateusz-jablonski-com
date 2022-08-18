import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalsPortalProps {
    children: ReactNode;
}

const ModalsPortal = ({ children }: ModalsPortalProps) => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);

        return () => setIsReady(false);
    }, []);

    return isReady ? createPortal(
        children,
        document.getElementById('modals'),
    ) : null;
}

export default ModalsPortal;
