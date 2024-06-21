import React from "react";
import { Lightbox as ModalLightbox } from "react-modal-image";

export default function Lightbox({ file, visible, hide }) {
    const full = `${process.env.PUBLIC_URL}/guide-files/${file}`;

    if (!visible) {
        return;
    }

    return (
        <ModalLightbox
            visible={visible}
            medium={full}
            large={full}
            alt={file}
            onClose={hide}
        />
    );
};
