
Vue.component('display', {
    props : ['valor'],
    template: `
    <div style="display: grid; grid-area: 1 / 1 / auto / 6; background-color: black; margin-left: 25px;
    margin-right: 25px; color: white; margin-bottom: 15px; padding: 12px; text-align: end; font-size: 26px;"> {{ valor }}

    </div>
    `
})

Vue.component('botonera', {
    data: function () {
        return {
         valor_actual_display: ' ',
         valor_anterior_display: ' ',
          contador: [7,8,9,"*","/",4,5,6,"+","-",1,2,3,"clear","calc",0,"."],
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
    <div>
    
    <div style="display: grid; grid-template-columns: repeat(5, 100px); grid-template-rows: repeat(4, 60px);
    background-color: grey; margin: auto; padding: 25px; width: 500px; border-radius: 10px;">
    <display :valor="valor_actual_display"></display>
    <div style="display: flex; justify-content: center;" v-for="k in contador" :key="k">
    <button style="width: 55px; display: flex; justify-content: center; font-size: 22px; height: 30px;
    border-radius: 10px;"v-on:click="action(k)">{{ k }}</button> </div>
    </div>
    </div>`
})

new Vue({
    el: '#calculadora',
})