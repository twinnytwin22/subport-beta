import React from "react";
export const useMountCheck = () => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;
}
