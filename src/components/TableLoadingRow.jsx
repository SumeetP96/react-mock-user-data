import React from "react";

export default function TableLoadingRow({ rows, cols, ...props }) {
  return (
    <>
      {Array.from({ length: rows }, (v, i) => i).map((num) => (
        <tr key={num} {...props}>
          {Array.from({ length: cols }, (v, i) => i).map((n) => (
            <td className="text-center" key={n}>
              <p className="placeholder-glow">
                <span className="placeholder col-12"></span>
              </p>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
