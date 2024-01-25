"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
    const storeModal = useStoreModal();

    return(
    <Modal
    title="create store"
    description="nouveau store"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}>
        Future create store form
    </Modal>
    );
}