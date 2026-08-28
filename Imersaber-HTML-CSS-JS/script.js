const form = document.querySelector("#contact-form");
const formUrl = document.querySelector("#form-url");
const successMessage = document.querySelector("#form-success");
const errorMessage = document.querySelector("#form-error");
const submitButton = form?.querySelector("button[type='submit']");
const ajaxEndpoint = "https://formsubmit.co/ajax/vslssbarbosa@gmail.com";

document.querySelector("#current-year").textContent = new Date().getFullYear();

if (form && formUrl && successMessage && errorMessage && submitButton) {
  formUrl.value = window.location.href.split("#")[0];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const honey = String(data.get("_honey") || "").trim();

    successMessage.hidden = true;
    errorMessage.hidden = true;

    if (honey) {
      form.reset();
      successMessage.hidden = false;
      return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = "Enviando... <span>•••</span>";

    try {
      const response = await fetch(ajaxEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false || result.success === "false") {
        throw new Error("Não foi possível enviar o formulário.");
      }

      form.reset();
      formUrl.value = window.location.href.split("#")[0];
      successMessage.hidden = false;
    } catch (error) {
      console.error(error);
      errorMessage.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = "Enviar proposta <span>↗</span>";
    }
  });
}
