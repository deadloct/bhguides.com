import React from "react";
import { Lightbox as ModalLightbox } from "react-modal-image";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function Lightbox({ file, visible, hide, type, contentType }) {
    const full = `/guide-files/${file}`;
    const isVideo = type === "video" || (contentType && contentType.startsWith("video/"));

    if (!visible) {
        return;
    }

    if (isVideo) {
        return (
            <Dialog
                open={visible}
                onClose={hide}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent sx={{ p: 1, position: 'relative' }}>
                    <IconButton
                        aria-label="Close video"
                        onClick={hide}
                        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1, bgcolor: 'rgba(0,0,0,0.4)', color: '#fff' }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <video
                        controls
                        autoPlay
                        style={{ width: '100%', maxHeight: '80vh', display: 'block', backgroundColor: '#000' }}
                    >
                        <source src={full} type={contentType || 'video/mp4'} />
                        Your browser does not support the video tag.
                    </video>
                </DialogContent>
            </Dialog>
        );
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
