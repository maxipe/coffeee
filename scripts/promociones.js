document.querySelectorAll(".contador").forEach((counter) => {
  const countSpan = counter.querySelector(".cantidad");
  counter.querySelector(".sumar").onclick = () => {
    countSpan.textContent = parseInt(countSpan.textContent) + 1;
    actualizarTotal();
  };
  counter.querySelector(".restar").onclick = () => {
    countSpan.textContent = Math.max(0, parseInt(countSpan.textContent) - 1);
    actualizarTotal();
  };
});

function actualizarTotal() {
  let subtotal = 0;
  let hayCafe = false;
  let hayComida = false;
  let hayPostre = false;

  document.querySelectorAll(".item[data-type]").forEach((item) => {
    const count = parseInt(item.querySelector(".cantidad").textContent);
    const price = parseInt(
      item.querySelector(".monto").textContent.replace("$", "")
    );

    if (count > 0) {
      subtotal += count * price;
      if (item.getAttribute("data-type") === "cafe") hayCafe = true;
      if (item.getAttribute("data-type") === "comida") hayComida = true;
      if (item.getAttribute("data-type") === "postre") hayPostre = true;
    }
  });
  let descuento = 0;

  if (hayCafe && hayComida && hayPostre) {
    descuento = Math.round(subtotal * 0.2);
  } else if (hayCafe && hayComida) {
    descuento = Math.round(subtotal * 0.15);
  } else if (hayCafe && hayPostre) {
    descuento = Math.round(subtotal * 0.1);
  }
  document.getElementById("subtotal").textContent = subtotal;
  document.getElementById("descuento").textContent = descuento;
  document.getElementById("total").textContent = subtotal - descuento;
}
actualizarTotal();
