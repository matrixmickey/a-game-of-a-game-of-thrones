"use client";

import { useActionState } from "react";

export default function DoneForm({action, submitButton}: {action: (state: {error: string | null}) => Promise<{error: string | null}>, submitButton: React.ReactNode}) {
    const [state, formAction] =  useActionState(action, {
        error: null 
    });

    return (
        <div className="done-form">
            {state.error && <div className="error">{state.error}</div>}
            <form action={formAction}>{submitButton}</form>
        </div>
    );
}