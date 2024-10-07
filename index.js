import Toast from "./classes/Toast/Toast.js";

const mp = new MercadoPago('APP_USR-12d59ee5-ac63-44b5-945c-80b64b07bfaf', {
  locale: 'pt'
});
const bricksBuilder = mp.bricks();

const toast = new Toast(11000);

const page = {
  async init() {
    this.preapproval_plan_id = this.getPlan();

    await this.fetchPlan();

    this.bricksConfig(bricksBuilder);
  },

  async fetchPlan() {
    try {
      const response = await fetch(`https://fk-3146878.bubbleapps.io/version-test/api/1.1/wf/buscar-plano/?id=${this.preapproval_plan_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      const plan = json.response.plan;
      this.planName = json.response.plan._api_c2_reason;

      document.querySelector("#plan-reason").innerText = this.planName;
      document.querySelector("#plan-subtotal").innerText = plan["_api_c2_auto_recurring.transaction_amount"].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
      document.querySelector("#plan-total").innerText = plan["_api_c2_auto_recurring.transaction_amount"].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

      console.log(json.response.plan)

    } catch (error) {
      console.error(error);
      window.location.href = 'https://fk-3146878.bubbleapps.io/version-test';
    }
  },

  getPlan() {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);

    return urlParams.get("preapproval_plan_id");
  },

  getPayerId() {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);

    return urlParams.get("client_id");
  },

  getName() {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);

    return urlParams.get("client_email");
  },

  async bricksConfig(bricksBuilder) {
    const settings = {
      initialization: {
        amount: this.plan === "factory_plan" ? 16.9 : 1.0,
        payer: {
          firstName: "",
          lastName: "",
          email: "teste@gmail.com",
        },
      },
      customization: {
        visual: {
          style: {
            theme: "default",
          },
        },
        paymentMethods: {
          creditCard: "all",
          atm: "all",
          maxInstallments: 1
        },
      },
      callbacks: {
        onReady: () => {

        },
        onSubmit: async ({ selectedPaymentMethod, formData }) => {
          try {
            const response = await fetch("https://fk-3146878.bubbleapps.io/version-test/api/1.1/wf/criar-assinatura/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                card_token_id: formData.token,
                client_id: this.getPayerId(),
                preapproval_plan_id: this.preapproval_plan_id
              }),
            });

            const data = await response.json();

            if (!response.ok || data.response.is_error) {
              throw new Error(`Erro na requisição: ${response.statusText} `);
            }

            console.log(data.response.is_error)
            console.log(data);

            window.location.href = `https://fk-3146878.bubbleapps.io/version-test/assinatura_sucesso?preapproval_plan_id=${this.preapproval_plan_id}`;

          } catch (error) {
            toast.error("Erro ao fazer a compra. Entre em contato com o suporte.");
            console.error(error);

            setTimeout(() => {
              window.location.href = 'https://fk-3146878.bubbleapps.io/version-test';
            }, 11000)
          }
        },
        onError: (error) => {
          console.log("deu erro");
          console.error(error);
        },
      },

    };
    window.paymentBrickController = await bricksBuilder.create(
      "payment",
      "paymentBrick_container",
      settings
    );
  }
}

window.onload = () => page.init();