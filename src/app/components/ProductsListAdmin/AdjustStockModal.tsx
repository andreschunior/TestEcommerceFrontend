import React, { useState } from "react";

interface AdjustStockModalProps {
  productId: number;
  onClose: () => void;
  onAdjustStock: (id: number, quantity: number) => void;
}

const AdjustStockModal: React.FC<AdjustStockModalProps> = ({
  productId,
  onClose,
  onAdjustStock,
}) => {
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ID de producto en modal antes del ajuste:", productId);
    if (productId) {
      onAdjustStock(productId, quantity);
    } else {
      console.error("productId está undefined en AdjustStockModal");
    }
    onClose();
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <h2>Ajustar Stock</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Cantidad:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="quantity-input"
            />
          </label>
          <div className="button-group">
            <button type="submit" className="submit-button">
              Guardar
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdjustStockModal;
