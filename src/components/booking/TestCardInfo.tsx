
import { memo } from "react";

const TestCardInfo = memo(() => {
  return (
    <div className="text-sm text-gray-500 mt-4">
      <p>Para pruebas, usa estos datos:</p>
      <ul className="list-disc pl-4 space-y-1">
        <li>Tarjeta: 4242 4242 4242 4242</li>
        <li>Fecha: Cualquier fecha futura</li>
        <li>CVC: Cualquier número de 3 dígitos</li>
      </ul>
    </div>
  );
});

TestCardInfo.displayName = 'TestCardInfo';

export { TestCardInfo };

