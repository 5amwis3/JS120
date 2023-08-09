function createInvoice(services = {}) {
  return {
    phone: services.phone === undefined? 3000 : services.phone,
    internet: services.internet === undefined? 5500 : services.internet,
    payments: [],

    total() {
      return this.phone + this.internet;
    },
    
    addPayment(payment) {
      return this.payments.push(payment);
    },

    addPayments(payments) {
      return this.payments.push(...payments);
    },

    amountDue() {
      let total = (this.phone + this.internet);
      return this.payments.reduce((accu, payment) => accu - payment.total(), total);
    }
  }
}

function createPayment(services = {}) {
  return {
    internetPaid: services.internet || 0,
    phonePaid: services.phone || 0,
    amount: services.amount,
    
    total() {
      return this.amount || (this.internetPaid + this.phonePaid);
    }

  }
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0
