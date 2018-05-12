const fs = require('fs');
const pathlib = require('path');

class DataAnalysis {
    formatResult (arr) {
        let map = {};
        let sortArr = [];
    
        arr.forEach(word => {
            word = word.toLowerCase();
            if (map[word]) {
                map[word]++;
            } else {
                map[word] = 1;
            }
        })
    
        Object.keys(map).forEach(word => {
            sortArr.push({
                [word]: map[word]
            })
        })
        sortArr = sortArr.sort((n1, n2) => {
            return n2[Object.keys(n2)[0]] - n1[Object.keys(n1)[0]]
        })
        return sortArr;
    }
    readFile(filePath) {
        try{
            let str = fs.readFileSync(filePath, 'utf-8');
            str = str.replace(/' '/g, '');
            let arr = str.match(/([a-z]+)/gi);
            return arr.filter((n) => n.length > 3); 
        } catch (e) {
            console.log(`read file "${filePath}" fail. error message: `,e);
            return [];
        }
    }
    readFolder(dir, collback) {
        try {
            let res = fs.readdirSync(pathlib.resolve(__dirname, dir));
            console.log(res);
            let arr = [];
            res.forEach(fileName => {
                let a = this.readFile(pathlib.resolve(__dirname, `${dir}/${fileName}`));
                arr = arr.concat(a);
            })
            arr = this.formatResult(arr);
            collback(arr);
        } catch (error) {
            console.log('read dir fail', error);
        }
    }
}

const dataAnalysis = new DataAnalysis();

dataAnalysis.readFolder('react', (arr) => {
    fs.writeFileSync(
        pathlib.resolve(__dirname, 'res.json'),
        JSON.stringify(arr)
    )
});

// let formatRes = (arr) => {
//     let map = {};
//     let sortArr = [];

//     arr.forEach(word => {
//         word = word.toLowerCase();
//         if (map[word]) {
//             map[word]++;
//         } else {
//             map[word] = 1;
//         }
//     })

//     Object.keys(map).forEach(word => {
//         sortArr.push({
//             [word]: map[word]
//         })
//     })
//     sortArr = sortArr.sort((n1, n2) => {
//         return n2[Object.keys(n2)[0]] - n1[Object.keys(n1)[0]]
//     })
//     return sortArr;
// }

// let read = (filePath) => {
//     try{
//         let str = fs.readFileSync(filePath, 'utf-8');
//         str = str.replace(/' '/g, '');
//         let arr = str.match(/([a-z]+)/gi);
//         return arr.filter((n) => n.length > 3); 
//     } catch (e) {
//         console.log(`read file "${filePath}" fail. error message: `,e);
//         return [];
//     }
// }
// let readFolder = (dir) => {
//     try {
//         let res = fs.readdirSync(pathlib.resolve(__dirname, dir));
//         console.log(res);
//         let arr = [];
//         res.forEach(fileName => {
//             let a = read(pathlib.resolve(__dirname, `${dir}/${fileName}`));
//             arr = arr.concat(a);
//         })
//         arr = formatRes(arr);
//         console.log(arr);
//         fs.writeFileSync(
//             pathlib.resolve(__dirname, 'res.json'),
//             JSON.stringify(arr)
//         )
//     } catch (error) {
//         console.log('read dir fail', error);
//     }
// }
// readFolder('react');
