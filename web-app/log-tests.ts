// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ,12, 13 ,14 ,15 ,16 ,17 ,18, 19, 20,
//   21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
// const linearSearch = (arr, node) => {
//   for(let i = 0; i < arr.length; i++){
//     console.log(`looking for ${node}`)
//     console.log(arr[i])
//     if(arr[i] === node){
//       console.log(`found node at ${arr[i]}th index`)
//       break;
//     }
//   }
// }


// linearSearch(array, 29);

// const logFunc = (n: number) => {
//   if (n <= 0) return("Done");
//   n = Math.floor(n / 2);
//   return logFunc(n);
// };
// logFunc(100);

const fib = ( n:number, p: Array<number> = [] ) => {
    console.log('running')
    if (p != null) return p[n];
    let result: number;
    if(n <= 2) {
        result = 1;
    }else{
        result = fib(n - 1) + fib(n - 2)
    }
    p[n] = result;
    return result;
};
console.log(fib(3));

// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ,12, 13 ,14 ,15 ,16 ,17 ,18, 19, 20,
// 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
// 43, 44, 45, 46, 47, 48, 49, 50];

// const binarySearch = (arr, node) =>{
//   let f = 0;
//   let l = arr.length - 1;
//   let p = -1;
//   let found = false;
//   let m;
//   while (!found && f <= l) {
//     // console.log('looking');
//     m = Math.floor((f + l)/2);
//       if (arr[m] == node) {
//         found = true;
//         p = m;
//       }else if (arr[m] > node) {
//         l = m -1;
//       }else{
//         f = m + 1;
//       }
//       console.log(found);
//   };
// } 
// binarySearch(array, 45);
// const arra = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ,14 ,15 ,16 ,17 ,18, 19, 20];
// let deletedNums = array.splice(5, 10);
// console.log(array.map(num => ` new ${num}`));
// function* generate(){
//   console.log('1st');
//   yield;
//   console.log("2nd")
//   yield;
// }
// for(const g of generate()){
//   console.log(g);
// }

//   let results = array.every(e => e > 0);
//   console.log(results)
  

// console.log(array);


     {/* <div className='scroll-bottom'>
        {messageRecieved.map((messageContent) => {
            return(
                <div
                className='id-finder'
                // id={name === messageContent.name ? "you": 'other '}
                >
                    <div className='message-content'>
                        <p>{messageContent.name}:{messageContent.currentMessage}</p>
                    </div>
                    <div className='message-meta'>
                        {/* {messageContent.name}</p> */}
                  {/*  </div>
                </div>
                );
            })}
            </div> */}