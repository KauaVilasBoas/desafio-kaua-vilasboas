import { Comida } from "./cardapio/comida.js";

class CaixaDaLanchonete {

  cafe = new Comida("cafe", "Café", 3.00)
  chantily = new Comida("chantily", "Chantily (extra do Café)", 1.50)
  suco = new Comida("suco", "Suco Natural", 6.20)
  sanduiche = new Comida("sanduiche", "Sanduíche", 6.50)
  queijo = new Comida("queijo", "Queijo (extra do Sanduíche)", 2.00)
  salgado = new Comida("salgado", "Salgado", 7.25)
  combo1 = new Comida("combo1", "1 Suco e 1 Sanduíche", 9.50)
  combo2 = new Comida("combo2", "1 Café e 1 Sanduíche", 7.50)

  cardapio = [this.cafe, this.chantily, this.suco, this.sanduiche, this.queijo, this.salgado, this.combo1, this.combo2]
  

  calcularValorDaCompra(metodoDePagamento, items) {
    try {
      var valorTotalDoCarrinho = this.calcularValorTotalDoCarrinho(items);
      return "R$ " + this.calcularPagamento(metodoDePagamento, valorTotalDoCarrinho).replace('.', ',');
    } catch (error) {
      return error.message;
    }

  }

  calcularPagamento(metodoDePagamento, valorTotal) {

    switch (metodoDePagamento) {
      case "dinheiro":
        return this.descontoEmDinheiro(valorTotal).toFixed(2);
        break;

      case "credito":
        return this.acrescimoEmCredito(valorTotal).toFixed(2);
        break;

      case "debito":
        return valorTotal.toFixed(2);
        break;
      default:
        throw new Error("Forma de pagamento inválida!");
    }

  }

  descontoEmDinheiro(valorTotal) {
    return valorTotal -= valorTotal * 0.05;
  }

  acrescimoEmCredito(valorTotal) {
    return valorTotal += valorTotal * 0.03;
  }

  calcularValorTotalDoCarrinho(items) {

      this.validarItemsExtrasDoCarrinho(items);

      var valorTotal = 0;

      if (items.length == 0) {
        throw new Error("Não há itens no carrinho de compra!");
      }

      items.forEach(element => {
        var arraySplit = element.split(',');

        this.cardapio.map((e) => {

          if (arraySplit[1] === undefined) {
            throw new Error("Item inválido!")
          }
          else if (arraySplit[1] <= 0) {
            throw new Error('Quantidade inválida!')
          }
          else if (arraySplit[0] === e.codigo) {
            valorTotal += Number(arraySplit[1]) * e.valor;
          }
          else if (valorTotal == 0) {
            throw new Error("Item inválido!")
          } 

        })

      });
      return Number(valorTotal);

  }

  validarItemsExtrasDoCarrinho(items) {
    const itemRequerido = {
      chantily: "cafe",
      queijo: "sanduiche"
    };
  
    for (const element of items) {
      const [principal, _] = element.split(',');
  
      if (itemRequerido[principal] && !items.some(item => item.startsWith(itemRequerido[principal]))) {
        throw new Error('Item extra não pode ser pedido sem o principal');
      }
    }
  
    return false;
  }
  
  
}

const caixa = new CaixaDaLanchonete();
caixa.calcularValorDaCompra("credito", ["cafe, 2"])

export { CaixaDaLanchonete };
