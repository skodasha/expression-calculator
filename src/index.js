function eval() {
    // Do not use eval!!!
    return;
}


function expressionCalculator(expr) {
    expr = expr.replace(/\+/g, " + ").replace(/\-/g, " - ").replace(/\//g, " / ").replace(/\*/g, " * ").replace(/\(/g, " ( ").replace(/\)/g, " ) ");
    expr = expr.split(" ").filter(item => (item != ""));
    let stack = [];
    let res = 0;
    let i = 0;
    let count = 0;
    let result = [];
    let value;
    while(i < expr.length){
        if(expr[i] == ")"){
            if (count == 0){
                throw("ExpressionError: Brackets must be paired");
            }   
            else{
                count--;
                let valueInBrackets = [];
                value = stack.pop();
                while(value !== "("){
                    valueInBrackets.push(value);
                    value = stack.pop();
                }
                result = mulDivCalculator(valueInBrackets);
                res = plusMinCalculator(result);
                stack.push(res);
            }
        }
        else{
            if(expr[i] == "("){
                count++;
            } 
            stack.push(expr[i]);
        }
        i++;
    }
    if(count != 0)
        throw("ExpressionError: Brackets must be paired");
    stack = stack.reverse();
    stack = mulDivCalculator(stack);
    res = plusMinCalculator(stack);
    return res;
}
function mulDivCalculator(stack){
    let len = stack.length;
    
    let i = 0;
    let value;
    let result = [];
    
    while(i < len){
        value = stack.pop();
        switch(value){
            case "/":
                let dividend = stack.pop();
                if(dividend == "0"){
                    throw "TypeError: Division by zero.";
                }
                else{
                    res = result.pop() / dividend;
                    result.push(res);
                }
                i += 2;
                break;
            
            case "*":{
                res = stack.pop() * result.pop();
                result.push(res);
                i += 2;
                break;
            }
            default:
                result.push(value);
                i++;
                break;
        }
    }
    return result;
}
function plusMinCalculator(stack){
    let j = 0;
    let length = stack.length;
    stack = stack.reverse();
    let result = 0;
    while(j < length){
        
        let value = stack.pop();
        switch(value){
            case "+":
                result += Number(stack.pop()) ;
                j += 2;
                break;
            case "-":
                result -= Number(stack.pop());
                j += 2;
                break;
            case "":
                j++;
                break;
            default:
                result = Number(value);
                j++;
                break;
        }
    }
    return result;
}
module.exports = {
    expressionCalculator
}