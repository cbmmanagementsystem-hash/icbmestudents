/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// const twoSum = function(nums:number[], target: number) {
//     for(let i = 0; i <= nums.length; i++){
//         const k = nums[i] + nums[i+1]
//         if(k === target ){
//             return [nums[i], nums[i+1]]
//         }
//     }
// };


const nums =  [3,3]

for(let i = 0; i <= nums.length; i++){
        const k = nums[i] + nums[i+1]
        if(k === 6 ){
            console.log( [nums.indexOf(nums[i]), nums.indexOf(nums[i+1])] )
        }
        
    }