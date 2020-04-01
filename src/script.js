var fs = require('fs');
var pdf = require('html-pdf');
var options = { format: 'A4' };

function chunk(lista, qtd) {

    let newArray = []
    for (var i = 0; i < lista.length; i = i + qtd) {
        newArray.push(lista.slice(i, i + qtd))
    }
    return newArray;
}

async function generateHtml(listChunk) {
    var string = `
<style>

table { page-break-inside:auto }
tr    { page-break-inside:avoid; page-break-after:auto }
thead { display:table-header-group }
tfoot { display:table-footer-group }


.main {
    width: 630px;
}

.line {
    width: 100%;
}

.column {
    width: 50%;
}

.column tr {
    width: 100%;
}

.column td {
    width: 50%;
    height: 450px;
}

</style>
`;

    string += `
<table class="main">
`;

    listChunk.forEach(line => {

        // TABELA PRINCIPAL
        string += `
  <tr class="line">
  
  `;

        line.forEach(column => {

            string += `
      <td class="column">
       <table>
        <tr>
            <td width="50%" align="center" valign="middle">
                    <img src="./assets/logo.png" border="0" height="150px"><br />
                    <span style="font-family: Arial; font-size: 70px;"><b>${column}</b></span> <br />
                    <img src="https://www.invertexto.com/image.php?scale=3&rotation=0&font=arial&font_size=0&text=${column}&thickness=30&code=code39" alt="">
                    <span style="font-family: Verdana;font-size: 14px;display: block;text-align: center;"> www.<strong>seatec</strong>.com.br</span>
            </td>

            <td align="left" valign="top" style="padding: 10px;">
                <center><span style="font-family: Arial; font-size: 10px;"><b>Agradecemos a Preferência</b></span></center><br /><br />
                <span style="font-family: Arial; font-size: 14px;"><b>&bull; Utilize esta ficha para seus pedidos em cada setor.</b></span><br /><br />
                <span style="font-family: Arial; font-size: 14px;"><b>&bull; Após finalizar suas compras entregue-a ao caixa para a soma total de suas despesas.</b></span><br /><br />
                <span style="font-family: Arial; font-size: 14px;"><b>&bull; Mesmo que não a tenha utilizado, devolva-a na saída.</b></span><br /><br />
                <span style="font-family: Arial; font-size: 14px;"><b>&bull; Em caso de extravio ou danos na ficha, será cobrada uma taxa imposta pela gerência.</b></span><br /><br /><br />
                <center><span style="font-family: Verdana; font-size: 28px;"><b>Volte Sempre!</b></span></center>
            </td>
        </tr>
       </table>
      </td>
          `
        });

        string += ` 
   
  </tr>
    `;
    });

    string += ` 
</table>
`;

    console.log(string)
    return string;
}

async function handleSubmit(e) {
    console.log('eae')
    e.preventDefault();

    const $start = document.getElementById('start').value;
    const $end = document.getElementById('end').value;

    let comandas = [];
    for (let i = $start; i <= $end; i++) {
        comandas.push(i);
    }

    console.log('comandas', comandas)

    let listChunk = chunk(comandas, 2)

    console.log('listChunk', listChunk)

    const html = await generateHtml(listChunk);

    console.log('html', html)

    pdf.create(html, options).toFile('./comandas.pdf', (err, res) => {
        if (err) return console.error(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}

document.querySelector('#form').addEventListener('submit', handleSubmit);