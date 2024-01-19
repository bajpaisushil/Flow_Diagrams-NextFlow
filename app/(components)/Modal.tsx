import React from "react";

function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: any;
  children: any;
}) {
  return (
    <div
      className={`fixed inset-1 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
        <div className={`bg-white rounded-xl p-6 fixed top-10`}>
            {children}
        </div>
    </div>
  );
}

export default Modal;
