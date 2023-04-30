import React, { useEffect } from "react";
import s from './Popup.module.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Modal = ({active,close,children}) => {

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          close();
        }
      };
    
      useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown, false);
        };
      });
    return (
        <div className={active?s.modal_active:s.modal} onClick={close}>
            <div className={active?s.modal__content_active:s.modal__content} onClick={e=>e.stopPropagation()}>
            <HighlightOffIcon onClick={close} className={s.icon} sx={{position:'absolute', top:'5px',right:'5px',cursor:'pointer'}}/>
                {children}
            </div>
        </div>
    )
}

export default Modal