import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordFrequency: [],
            prevWordFrequency: [],
            inputText: "" // Store input text
        };
    }

    componentDidMount() {
        this.renderChart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.wordFrequency !== this.state.wordFrequency) {
            this.renderChart();
            this.setState({ prevWordFrequency: this.state.wordFrequency });
        }
    }

    getWordFrequency = (text) => {
        const stopWords = new Set(["the", "and", "a", "an", "in", "on", "at", "for", "with", "about", "as", "by", "to", "of", "from", "that", "which", "who", "whom", "this", "these", "those", "it", "its", "they", "their", "them", "we", "our", "ours", "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "it", "its", "we", "us", "our", "ours", "they", "them", "theirs", "I", "me", "my", "myself", "you", "your", "yourself", "yourselves", "was", "were", "is", "am", "are", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "as", "if", "each", "how", "which", "who", "whom", "what", "this", "these", "those", "that", "with", "without", "through", "over", "under", "above", "below", "between", "among", "during", "before", "after", "until", "while", "of", "for", "on", "off", "out", "in", "into", "by", "about", "against", "with", "amongst", "throughout", "despite", "towards", "upon", "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't", "doesn't", "didn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "mustn't", "needn't", "daren't", "hasn't", "haven't", "hadn't"]);
        const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=_`~()]/g, "").replace(/\s{2,}/g, " ").split(" ");
        const filteredWords = words.filter(word => !stopWords.has(word));
        return Object.entries(filteredWords.reduce((freq, word) => {
            freq[word] = (freq[word] || 0) + 1;
            return freq;
        }, {}));
    }

    renderChart() {
        const data = this.state.wordFrequency.sort((a,b)=>b[1]-a[1]).slice(0,5);
        console.log(data);

        const fontSizeScale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([80, 20]);

        const svgParent = d3.select(".svg_parent")
            .attr("width", 1000)
            .attr("height", 150);

        let currentX = 0;

        svgParent.selectAll("text")
            .data(data, d => d[0])
            .join(
                enter => enter
                    .append("text")
                    .text(d => d[0])
                    .attr("x", function(d, i) {
                        const fontSize = fontSizeScale(i);
                        const wordLength = d[0].length * (fontSize / 2);
                        const previousX = currentX;
                        currentX += wordLength + 20;
                        return previousX;
                    })
                    .attr("y", 100)
                    .attr("fill", "black")
                    .attr("font-size", 1)
                    .style("opacity", 0)
                    .call(enter => enter.transition()
                        .duration(2000)
                        .attr("font-size", (d, i) => fontSizeScale(i))
                        .style("opacity", 1)),
                update => update
                    .call(update => update.transition()
                        .duration(1000)
                        .attr("font-size", (d, i) => fontSizeScale(i))
                        .attr("x", function(d, i) {
                            const fontSize = fontSizeScale(i);
                            const wordLength = d[0].length * (fontSize / 2);
                            const previousX = currentX;
                            currentX += wordLength + 20;
                            return previousX;
                        })),
                exit => exit
                    .transition()
                    .duration(1000)
                    .attr("font-size", 1)
                    .style("opacity", 0)
                    .remove()
            );
    }

    handleTestClick = (text) => {
        this.setState({ inputText: text, wordFrequency: this.getWordFrequency(text) }, () => {
            document.getElementById("input_field").value = text; // Set the input field value
        });
    }

    render() {
        return (
            <div className="parent">
                <div className="child1" style={{ width: 1000 }}>
                    <textarea
                        type="text"
                        id="input_field"
                        style={{ height: 150, width: 1000 }}
                        value={this.state.inputText} // Bind input value to state
                        onChange={(e) => this.setState({ inputText: e.target.value })} // Update state on change
                    />
                    <button
                        type="submit"
                        value="Generate Matrix"
                        style={{ marginTop: 10, height: 40, width: 1000 }}
                        onClick={() => {
                            const input_data = this.state.inputText;
                            this.setState({ wordFrequency: this.getWordFrequency(input_data) });
                        }}
                    >
                        Generate WordCloud
                    </button>
                </div>
                <div className="child2">
                    <svg className="svg_parent"></svg>
                </div>
                <ul style={{ width: 1000 }}>
                    <li>
                        <button onClick={() => this.handleTestClick("The streets were filled with people, people walking, people talking, people laughing, people in a hurry. Everyone seemed to be in a rush, moving quickly from one place to another. The city was alive with activity, with people everywhere you looked. The noise of the city was constant, with cars honking, people chatting, and footsteps echoing through the streets. It was a city full of people, a city where life never stopped.")}>
                            Test Text 1
                        </button>
                    </li>
                    <li>
                        <button onClick={() => this.handleTestClick("The streets stretched endlessly, weaving through the heart of the city, connecting neighborhoods in a seamless flow. In every corner of the city, there was something happening, whether it was the vibrant market stalls or the quiet parks hidden amidst the urban landscape. The city skyline towered above, a reminder of the ambition and drive that defined the city. As night fell, the lights of the city illuminated the streets, casting a glow that reminded everyone just how alive the city truly was.")}>
                            Test Text 2
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;



// import React, { Component } from "react";
// import "./App.css";
// import * as d3 from "d3"
//
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             wordFrequency: [],
//             prevWordFrequency: []
//         };
//     }
//
//     componentDidMount() {
//         this.renderChart();
//     }
//
//     componentDidUpdate(prevProps, prevState) {
//         if (prevState.wordFrequency !== this.state.wordFrequency) {
//             this.renderChart();
//             // Update the prevWordFrequency only if there's a change
//             this.setState({ prevWordFrequency: this.state.wordFrequency });
//         }
//     }
//
//     getWordFrequency = (text) => {
//         const stopWords = new Set(["the", "and", "a", "an", "in", "on", "at", "for", "with", "about", "as", "by", "to", "of", "from", "that", "which", "who", "whom", "this", "these", "those", "it", "its", "they", "their", "them", "we", "our", "ours", "you", "your", "yours", "he", "him", "his", "she", "her", "hers", "it", "its", "we", "us", "our", "ours", "they", "them", "theirs", "I", "me", "my", "myself", "you", "your", "yourself", "yourselves", "was", "were", "is", "am", "are", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "as", "if", "each", "how", "which", "who", "whom", "what", "this", "these", "those", "that", "with", "without", "through", "over", "under", "above", "below", "between", "among", "during", "before", "after", "until", "while", "of", "for", "on", "off", "out", "in", "into", "by", "about", "against", "with", "amongst", "throughout", "despite", "towards", "upon", "isn't", "aren't", "wasn't", "weren't", "haven't", "hasn't", "hadn't", "doesn't", "didn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "mustn't", "needn't", "daren't", "hasn't", "haven't", "hadn't"]);
//         const words = text.toLowerCase().replace(/[.,/#!$%^&*;:{}=_`~()]/g, "").replace(/\s{2,}/g, " ").split(" ");
//         const filteredWords = words.filter(word => !stopWords.has(word));
//         return Object.entries(filteredWords.reduce((freq, word) => {
//             freq[word] = (freq[word] || 0) + 1;
//             return freq;
//         }, {}));
//     }
//
//     renderChart() {
//         const data = this.state.wordFrequency.sort((a, b) => b[1] - a[1]).slice(0, 5);
//
//         const fontSizeScale = d3.scaleLinear()
//             .domain([0, data.length - 1])
//             .range([80, 20]);
//
//         const svgParent = d3.select(".svg_parent")
//             .attr("width", 1000)
//             .attr("height", 150);
//
//         let currentX = 0;
//
//         svgParent.selectAll("text")
//             .data(data, d => d[0])
//             .join(
//                 enter => enter
//                     .append("text")
//                     .text(d => d[0])
//                     .attr("x", function(d, i) {
//                         const fontSize = fontSizeScale(i);
//                         const wordLength = d[0].length * (fontSize / 2);
//                         const previousX = currentX;
//                         currentX += wordLength + 20;
//                         return previousX;
//                     })
//                     .attr("y", 100)
//                     .attr("fill", "black")
//                     .attr("font-size", 1)
//                     .style("opacity", 0)
//                     .call(enter => enter.transition()
//                         .duration(2000)
//                         .attr("font-size", (d, i) => fontSizeScale(i))
//                         .style("opacity", 1)),
//                 update => update
//                     .call(update => update.transition()
//                         .duration(1000)
//                         .attr("font-size", (d, i) => fontSizeScale(i))
//                         .attr("x", function(d, i) {
//                             const fontSize = fontSizeScale(i);
//                             const wordLength = d[0].length * (fontSize / 2);
//                             const previousX = currentX;
//                             currentX += wordLength + 20;
//                             return previousX;
//                         })),
//                 exit => exit
//                     .transition()
//                     .duration(1000)
//                     .attr("font-size", 1)
//                     .style("opacity", 0)
//                     .remove()
//             );
//     }
//
//     render() {
//         return (
//             <div className="parent">
//                 <div className="child1" style={{width: 1000 }}>
//                     <textarea type="text" id="input_field" style={{ height: 150, width: 1000 }}/>
//                     <button type="submit" value="Generate Matrix" style={{ marginTop: 10, height: 40, width: 1000 }} onClick={() => {
//                         var input_data = document.getElementById("input_field").value
//                         this.setState({wordFrequency:this.getWordFrequency(input_data)})
//                     }}
//                     > Generate WordCloud</button>
//                 </div>
//                 <div className="child2"><svg className="svg_parent"></svg></div>
//                 <div>
//                     <blockquote>The streets were filled with people, people walking, people talking, people laughing, people in a hurry. Everyone seemed to be in a rush, moving quickly from one place to another. The city was alive with activity, with people everywhere you looked. The noise of the city was constant, with cars honking, people chatting, and footsteps echoing through the streets. It was a city full of people, a city where life never stopped.</blockquote>
//
//                     <blockquote>The streets stretched endlessly, weaving through the heart of the city, connecting neighborhoods in a seamless flow. In every corner of the city, there was something happening, whether it was the vibrant market stalls or the quiet parks hidden amidst the urban landscape. The city skyline towered above, a reminder of the ambition and drive that defined the city. As night fell, the lights of the city illuminated the streets, casting a glow that reminded everyone just how alive the city truly was.</blockquote>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default App;