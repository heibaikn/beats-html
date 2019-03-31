<template>
    <div style="display:inline-block;padding:0 6px;">
        <Dropdown trigger="click" @on-click="setLanguage">
            <a href="javascript:void(0)">
                <span>语言({{currLanguage}})</span>
                <Icon type="arrow-down-b"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) in List" :key="index" :name="item.name">
                    <Row type="flex" justify="center" align="middle">
                        <span>{{item.label}}</span>
                    </Row>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'themeSwitch',
    data () {
        return {
            currLanguage: '',
            List: [
                {label: '中文', name: 'chinese'},
                {label: 'English', name: 'english'},
            ]
        };
    },
    methods: {
        setLanguage (name) {
            localStorage.setItem('language', name);
            location.reload();
        }    
    },
    created () {
        let language = localStorage.getItem('language') || 'chinese';
        let curr = this.List.find(v=>{
        return v.name == language ? true : false
        })
        this.currLanguage = curr.label;
    }
};
</script>
