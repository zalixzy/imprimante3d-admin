"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";


interface AlterModalProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: () => void,
    loading: boolean;
}
export const AlertModal: React.FC<AlterModalProps> = ({
        isOpen,
        onClose,
        onConfirm,
        loading
}) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }

    return(
        <Modal
            title="Etes vous sur?"
            description="Cette action ne peut être réservée"
            isOpen={isOpen}
            onClose={onClose}
        >
             <div className="pt-6 space-x-2 items-center flex justify-end w-full">

                <Button disabled={loading} variant="outline">
                    Annuler
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    Continuer
                </Button>
             </div>

        </Modal>
    )
}