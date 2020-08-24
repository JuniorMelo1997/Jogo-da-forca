var gerador = 10*Math.random();
var str;
var blankspace = [];
var cont;
var resultado = document.getElementById('res');

//Teste incial de um gerador de palavras. Depois, provavelmente, será trocado por um gerador melhor. Por hora contém apenas 2 palavras
if(gerador < 5)
    str="cachorro";
else
    str="alçapão";

var tam = str.length; //Serve para pegar o tamanho da string

for(cont = 0; cont < tam; cont++){ //Gera um array cheio de ' _ ' para mostrar quantas letras tem a palavra
    blankspace[cont] = ' _ ';
    resultado.innerHTML += blankspace[cont];
}

/*A função abaixo serve para verificar se a letra inserida está presente na palavra. Também serve para ir 'revelando' as letra ao jogador, conforme
ele vai acertando. Resumidamente, todas as vezes que o jogador tentar inserir uma letra, todo o processo será executado por essa função*/
function tentativa(){
    
    /*A ideia é o seguinte: pego a palavra (salva em str) e, para não alterar a variável original onde está salva a palavra, salvo ela em outra
    variável (substr). */
    let letra = document.getElementById('letra').value; //Recebe a letra que o jogador inseriu
    let substr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); /*substring que vai ser útil no for para ver se há mais de um do mesmo caractere.
        É necessário retirar acentos e cedilhas das palavras pois, caso mantidas, elas conflitariam na hora da inserção de uma letra. Ex: caso a palavra
    fosse 'açaí', quando o jogador inserisse 'i', por exemplo, apareceria não encontrado pois 'i', sem acento, é diferente de 'í', com acento.
        normalize() serve para normalizar os caracteres da string. Com 'NFD' normalizamos de forma padrão, sem os acentos e cedilha, por exemplo.
    Ex: para a string 'pão', o normalize('NFD') retorna 'pa~o', separando o acento, por exemplo, como um caractere próprio. Usando replace() subs-
    titui-se todos os acentos por um caractere vazio ''. 
        Obs: [\u0300-\u036f] é a faixa que contém os códigos dos acentos e especiais que precisam
    ser tirados das letras.*/
    let pos = 0; //essa variável vai servir para saber, caso a letra inserida ocorra na palavra, em qual posição ela está
    let guardapos = 0; //Essa variável será útil para armazenar a posição na hora de usar substring para guardar a posição de uma letra na palavra
    cont = 0; //contador

    /*  A partir daqui funciona assim: faz-se uma verificação pela primeira vez para ver se há ocorrência da letra na palavra. Caso não haja, ele
    informa que não há e espera outra letra e, caso haja, entra no else abaixo.
        Se entrou no else, então é porque há ocorrência da letra na palavra. Nesse caso, 'zeramos' o conteúdo da variável resultado (responsável
    por mostrar a palavra se formando) para recoloca-la após fazer tudo o que é necessário antes de mostrar novamente ao jogador.
        A ideia por trás desse código, que é na verdade a ideia por trás do funcionamento de todo esse jogo, é o seguinte: após verificar a ocor-
    rência de uma letra em uma posição x usando indexOf(), então corta-se a string usando slice() a partir da posição x+1. Então é efetuada uma
    nova busca nessa nova string, cortada da original, de forma a procurar encontrar uma outra ocorrência da letra. Caso haja, o processo se repete:
    corta-se novamente a string e procura-se outra ocorrência da letra, e assim vai até não encontrar mais nenhuma vez a letra presente na string.
        A cada corte executado, é salvo em um array, na posição correspondente à posição da letra na palavra, a letra encontrada. Para tal foi usada
    uma outra variável auxiliar (guardapos) para guardar a posição. */
    pos = substr.indexOf(letra);

    if(pos == -1)
            alert("Letra não encontrada");
    else{
        resultado.innerHTML = '';
        pos = 0;
    while(pos != -1){
    pos = substr.indexOf(letra);
    
    if(pos != -1){ 
        substr = substr.slice(++pos, tam);
     
        guardapos += pos ;
        blankspace[guardapos - 1] = str.charAt(guardapos - 1); /*Armazena, na posição adequada, a letra inserida, caso ela faça parte da palavra.
            Notas que a letra é retirada diretamente da palavra salva na string str pois lá estão salvas as letras com os possíveis acentos 
        que ela possa conter. */
    }

    /*  Por fim, esse for logo abaixo é utilizado para mostrar novamente o resultado ao jogador, mostrando onde estão as letras que ele acertou, 
    como acontece num jogo da forca no papel mesmo. */
    }
    for(cont = 0; cont < tam; cont++){
        resultado.innerHTML += blankspace[cont];
    }
}

}