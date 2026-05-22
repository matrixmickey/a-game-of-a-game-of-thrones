"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({notPendingText, pendingText}: {notPendingText: string, pendingText: string}) {
    const { pending } = useFormStatus()

    return (
        <button className={`submit${pending ? " pending" : ""}`} type="submit" disabled={pending}>
          {pending ? pendingText : notPendingText}
        </button>
    );
}