const p1 = (a, b) => {
    return new Promise((resolve, reject) => {
        if (a === b) return;
        if (a > b) resolve('resolved');
        else reject('rejected');
    })
};

async function p2() {

}
async function p3() {
    const a = await p2();
    console.log(a);
}
const list = [
    {name: 'a', id: 2, pid: 1},
    {name: 'b', id: 3, pid: 2},
    {name: 'c', id: 4, pid: 3},
    {name: 'd', id: 5, pid: 10},
    {name: 'e', id: 6, pid: 5}
]

let cCheckbox = {
    template: `
	<div>
		<input type="checkbox" @change="doSelect" :value="value" :checked="checked">
		<span>{{value}}</span>
	</div>`,
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        value: String,
        checked: Boolean
    },
    methods: {
        doSelect(e) {
            this.$emit('change', !this.checked);
        }
    }
}

let cInput = {
    template: `<div><input type="text" @input="doInput" :value="value"></div>`,
    props: {
        value: String,
    },
    methods: {
        doInput(e) {
            this.$emit('input', e.target.value);
        }
    }
}

/*new Vue({
    el: '#app',
    data() {
        return {
            price: 'price',
            fruit: {
                apple: true,
                pear: false
            }
        }
    },
    components: {
        cCheckbox,
        cInput
    }
})*/
function Live(type) {
    this.type = type;
}
Live.prototype.sayType = function () {
    console.log(this.type);
}

function Man() {

}
Man.prototype = new Live('man');


