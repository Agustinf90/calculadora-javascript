
Vue.component('display', {
    props : ['valor'],
    template: `
    <div style="background-color: black;width: 200px; width: 200px; height: 70px; margin-left: 25px;">
    <h2 id="display" style=" color: white; padding: 10px">{{ valor }}</h2>
    </div>
    `
})

Vue.component('botonera', {
    data: function () {
        return {
         valor_actual_display: ' ',
         valor_anterior_display: ' ',
          contador: [7,8,9,"*",4,5,6,"/",1,2,3,"+","clear",0,".","-","calc",],
          operador: ' '
        }
      },
    methods: {
        action(tecla) {
                if (!isNaN(tecla) || tecla === '.') {    
                    this.valor_actual_display += tecla + ''
                }   
                if(['+','-','*','/'].includes(tecla)) {
                    let numerico = this.valor_actual_display
                    numerico = Number(numerico)
                    this.valor_actual_display = numerico
                    this.valor_anterior_display = this.valor_actual_display
                    this.operador = tecla
                    this.valor_actual_display = ' '
                }
                if(tecla === 'calc') {
                    let numerico = this.valor_actual_display
                    numerico = Number(numerico)
                    this.valor_actual_display = numerico
                        this.valor_actual_display = eval(
                        this.valor_anterior_display + this.operador + this.valor_actual_display  
                    )
                    if(this.valor_actual_display === Infinity)
                    {
                        alert("error")
                    this.valor_actual_display = ' '
                    }
                    
                    if(this.valor_actual_display % 1 != 0) {
                    let numero = this.valor_actual_display
                    let numeroEntero = numero.toFixed(2)
                    this.valor_actual_display = numeroEntero
                    }
                    this.valor_anterior_display = ' '
                    this.operador = ' '
                }
                if (tecla === 'clear') {
                    this.valor_actual_display = ''
               } 
          }
      },
    template: `
    <div style="display: grid; grid-template-columns: repeat(4, 100px);
    grid-template-rows: 60px repeat(5, 60px);
    background-color: grey; margin: auto; padding: 25px; width: 400px; border-radius: 10px;">
    <div style="display: flex;
    justify-content: center;" v-for="k in contador" :key="k">
    <button style="width: 55px; display: flex; justify-content: center; font-size: 22px; height: 30px;
    border-radius: 10px;"v-on:click="action(k)">{{ k }}</button>
    </div>
    <display :valor="valor_actual_display"></display>
    </div>`
})

new Vue({
    el: '#calculadora',
})