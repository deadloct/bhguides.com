import React, { useRef, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import styles from "./lightbox.module.css";

export default function Lightbox({ file, visible, hide, type, contentType, onShare }) {
    const full = `/guide-files/${file}`;
    const isVideo = type === "video" || (contentType && contentType.startsWith("video/"));
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (visible) {
            if (!dialog.open) dialog.showModal();
        } else {
            if (dialog.open) dialog.close();
        }
    }, [visible]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        dialog.addEventListener('close', hide);
        return () => dialog.removeEventListener('close', hide);
    }, [hide]);

    if (isVideo) {
        if (!visible) return null;
        return (
            <Dialog open={visible} onClose={hide} maxWidth="lg" fullWidth>
                <DialogContent sx={{ p: 1, position: 'relative' }}>
                    {onShare && (
                        <IconButton
                            aria-label="Copy link to this guide"
                            title="Copy link to this guide"
                            onClick={onShare}
                            sx={{ position: 'absolute', top: 8, right: 56, zIndex: 1, bgcolor: 'rgba(0,0,0,0.4)', color: '#fff' }}
                        >
                            <ShareIcon />
                        </IconButton>
                    )}
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
        <dialog
            ref={dialogRef}
            className={styles.lightbox}
            onClick={e => { if (e.target === dialogRef.current) hide(); }}
        >
            <div className={styles.content}>
                <div className={styles.toolbar}>
                    {onShare && (
                        <IconButton
                            aria-label="Copy link to this guide"
                            title="Copy link to this guide"
                            onClick={onShare}
                            sx={{ color: '#fff', bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                        >
                            <ShareIcon />
                        </IconButton>
                    )}
                    <IconButton
                        aria-label="Close"
                        onClick={hide}
                        sx={{ color: '#fff', bgcolor: 'rgba(0,0,0,0.5)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <img src={full} alt={file} className={styles.image} />
            </div>
        </dialog>
    );
}
