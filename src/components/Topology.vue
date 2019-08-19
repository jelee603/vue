<template>
    <div id="cy"></div>
</template>

<script>
    import * as cytoscape from "cytoscape"

    export default {
        name: "topology",
        mounted() {
            this.init()
        },
        methods: {
            init: function(){
                cytoscape({
                    container: document.getElementById('cy'), // container to render in

                    elements: [ // list of graph elements to start with
                        { // node a
                            data: { id: 'a' }
                        },
                        { // node b
                            data: { id: 'b' }
                        },
                        { // node c
                            data: { id: 'c' }
                        },
                        { // edge ab
                            data: { id: 'ab', source: 'a', target: 'b' }
                        },
                        { // edge bc
                            data: { id: 'bc', source: 'b', target: 'c' }
                        }

                    ],

                    style: [ // the stylesheet for the graph
                        {
                            selector: 'node',
                            style: {
                                'background-color': '#666',
                                'label': 'data(id)'
                            }
                        },

                        {
                            selector: 'edge',
                            style: {
                                'width': 3,
                                'line-color': '#ccc',
                                'target-arrow-color': '#ccc',
                                'target-arrow-shape': 'triangle'
                            }
                        }
                    ],

                    layout: {
                        name: 'grid',
                        rows: 1
                    }

                });
            }
        }
    }
</script>

<style>
    #cy {
        width: 100%;
        height: 100%;
        display: block;
        background-color: grey
    }
</style>
