import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";

export default function EditMessageField({
    message: initialMessage,
    onEdit,
    onCancel,
}: {
    message: string;
    onEdit: (message: string) => void;
    onCancel: () => void;
}) {
    const [message, setMessage] = useState(initialMessage);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight+3}px`;
        }
    };
    useEffect(() => {
        adjustTextareaHeight();
    }, []);

    return (
        <div className="flex flex-col w-full h-fit">
            <Textarea
                ref={textareaRef}
                className="h-mx-full"
                onBlur={() => {
                    if (!isButtonClicked) {
                        onCancel();
                    }
                }}
                value={message}
                autoFocus={true}
                onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex gap-2 w-full flex-row-reverse">
                <Button
                    onMouseDown={() => setIsButtonClicked(true)}
                    onClick={() => {
                        onEdit(message);
                        setIsButtonClicked(false);
                    }}
                    className="btn btn-primary mt-2"
                >
                    Save
                </Button>
                <Button
                    onMouseDown={() => setIsButtonClicked(true)}
                    onClick={() => {
                        onCancel();
                        setIsButtonClicked(false);
                    }}
                    className="btn btn-secondary mt-2"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}