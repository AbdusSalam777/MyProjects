#include<iostream>
#include<cmath>
#include<math.h>
#include<string>
#include<fstream>  

#ifndef M_PI

#define M_PI 3.14159265358979323846

#endif

using namespace std;

int add();

int multiply();  

int division();

int subtract();

int square_root();

int power();

int natural_log();

int logarithm();

int sine();

int cosine();

void tangent();

void factorial();

void conversion();

void saveToHistory(const string &calculation);

//Factorial wala functions
int fact(int n){

    if (n<=1){

        return 1;

    }

    return n*fact(n-1);
}




// Conversions walay Functions
void km_to_miles() {

    double km;
    cout << "Enter kilometers: ";
    cin >> km;
    double miles = km * 0.621371;

    cout << km << " kilometers is " << miles << " miles." << endl;

}

void miles_to_km() {

    double miles;
    cout << "Enter miles: ";
    cin >> miles;
    double km = miles / 0.621371;
    cout << miles << " miles is " << km << " kilometers." << endl;

}

void m_to_inches() {

    double meters;
    cout << "Enter meters: ";
    cin >> meters;
    double inches = meters * 39.3701;
    cout << meters << " meters is " << inches << " inches." << endl;

}

void inches_to_m() {

    double inches;
    cout << "Enter inches: ";
    cin >> inches;
    double meters = inches / 39.3701;
    cout << inches << " inches is " << meters << " meters." << endl;

}

void feet_to_inches() {

    double feet;
    cout << "Enter feet: ";
    cin >> feet;
    double inches = feet * 12;
    cout << feet << " feet is " << inches << " inches." << endl;


}

void inches_to_feet() {


    double inches;
    cout << "Enter inches: ";
    cin >> inches;
    double feet = inches / 12;
    cout << inches << " inches is " << feet << " feet." << endl;


}

void kg_to_lb() {

    double kg;
    cout << "Enter kilograms: ";
    cin >> kg;
    double pounds = kg * 2.20462;
    cout << kg << " kilograms is " << pounds << " pounds." << endl;


}

void lb_to_kg() {


    double pounds;
    cout << "Enter pounds: ";
    cin >> pounds;
    double kg = pounds / 2.20462;
    cout << pounds << " pounds is " << kg << " kilograms." << endl;


}

void pounds_to_grams() {


    double pounds;
    cout << "Enter pounds: ";
    cin >> pounds;
    double grams = pounds * 453.592;
    cout << pounds << " pounds is " << grams << " grams." << endl;


}

void grams_to_pounds() {


    double grams;
    cout << "Enter grams: ";
    cin >> grams;
    double pounds = grams / 453.592;
    cout << grams << " grams is " << pounds << " pounds." << endl;

}

void celcius_to_fehrenheit() {


    double celsius;
    cout << "Enter Celsius: ";
    cin >> celsius;
    double fahrenheit = (celsius * 9 / 5) + 32;
    cout << celsius << " Celsius is " << fahrenheit << " Fahrenheit." << endl;


}

void fehrenheit_to_celcius() {


    double fahrenheit;
    cout << "Enter Fahrenheit: ";
    cin >> fahrenheit;
    double celsius = (fahrenheit - 32) * 5 / 9;
    cout << fahrenheit << " Fahrenheit is " << celsius << " Celsius." << endl;


}

void fehrenheit_to_kelvin() {


    double fahrenheit;
    cout << "Enter Fahrenheit: ";
    cin >> fahrenheit;
    double kelvin = (fahrenheit - 32) * 5 / 9 + 273.15;
    cout << fahrenheit << " Fahrenheit is " << kelvin << " Kelvin." << endl;

}

void kelvin_to_fehrenheit() {

    double kelvin;
    cout << "Enter Kelvin: ";
    cin >> kelvin;
    double fahrenheit = (kelvin - 273.15) * 9 / 5 + 32;
    cout << kelvin << " Kelvin is " << fahrenheit << " Fahrenheit." << endl;

}

// Main function

int main() {


    string choice;
    char useAgain;

    do {


        bool validChoice = false; 

        while (!validChoice) { 

            cout << "Enter choice: ";
            cin >> choice;


            if (choice == "+" || choice == "-" || choice == "x" || choice == "/") {

                validChoice = true; 

                if (choice == "+") {

                    add();

                } 
                
                else if (choice == "-") {


                    subtract();

                } 
                
                else if (choice == "x") {


                    multiply();

                } 
                
                else if (choice == "/") {

                    division();

                }
            } 
            
            else if (choice == "sqrt") {


                validChoice = true;
                square_root();

            } else if (choice == "^") {


                validChoice = true;
                power();

            } 
            
            else if (choice == "ln") {

                validChoice = true;
                natural_log();

            } 

            else if (choice == "log") {

                validChoice = true;
                logarithm();

            } 

            else if (choice == "sin") {

                validChoice = true;
                sine();

            } 

            else if (choice == "cos") {

                validChoice = true;

                cosine();

            } 

            else if (choice == "tan") {

                validChoice = true;

                tangent();
            } 

            else if (choice == "fact") {

                validChoice = true;

                factorial();
            } 

            else if (choice == "conversion") {

                validChoice = true;

                conversion();
            }

            else {

                cout << "Invalid Choice!" << endl; 

            }
        }

        cout << "\nWant to use again (y/n): ";
        cin >> useAgain;

    } while (useAgain == 'y');

    char p = 3.1415;

    cout << "Thank you for using " << p << endl;

    return 0;
}




// Add wala

int add() {

    int num;

    char op;
    int sum = 0;

    while(true){

        cin >> num;
        cin >> op;
        sum = sum + num;

        if(op == '='){
            break;
        }

    }

    cout << sum;

    saveToHistory("Addition result = " + to_string(sum));

    return 0;
}

// Subtract wala

int subtract() {

    int num;
    char op;
    double result = 0;
    bool first_num = true;

    while(true){
        cin >> num;
        cin >> op;

        if (first_num){
            result = num;
            first_num = false;

        }

        else {
            result = result - num;

        }

        if(op == '='){

            break;
        }

    }

    cout << result;

    saveToHistory("Subtraction result = " + to_string(result));

    return 0;

}

// Multiply aa gya


int multiply() {


    int num;
    char op;
    int product = 1;

    while(true){


        cin >> num;
        cin >> op;
        product = product * num;

        if(op == '='){
            break;
        }


    }

    cout << product;

    saveToHistory("Multiplication result = " + to_string(product));

    return 0;
}

// Division bhi ho gya

int division() {

    int num;
    char op;
    double result = 0;
    bool first_num = true;



    while(true){


        cin >> num;
        cin >> op;

        if (first_num){
            result = num;
            first_num = false;


        }


        else {

            if (num != 0) {

                result = result / num;

            } else {

                cout << "Error: Division by zero!" << endl;

                return 0;

            }
        }

        if(op == '='){

            break;

        }

    }

    cout << result;

    saveToHistory("Division result = " + to_string(result));


    return 0;

}

// Sqrt

int square_root() {


    int a;
    cin >> a;

    if(a < 0){


        cout << "Invalid Number" << endl;

    }
    else {
        double result = sqrt(a);

        cout << result;

        saveToHistory("Square root of " + to_string(a) + " = " + to_string(result));

    }

    return 0;
}

// Lo g power wala
int power() {

    double a;
    int b;
    cin >> a >> b;

    double result = pow(a, b);

    cout << result;


    saveToHistory("Power result: " + to_string(a) + "^" + to_string(b) + " = " + to_string(result));


    return 0;
}

// ln

int natural_log() {

    double n;
    cin >> n;
    double result = log(n);
    cout << result;
    saveToHistory("Natural log of " + to_string(n) + " = " + to_string(result));


    return 0;
}

// log

int logarithm() {
    double n;
    cin >> n;
    double result = log10(n);
    cout << result;
    saveToHistory("Logarithm of " + to_string(n) + " = " + to_string(result));


    return 0;
}

// Sin

int sine() {
    double angle, result;
    cin >> angle;
    result = angle * (M_PI / 180);
    cout << sin(result);
    saveToHistory("Sine of " + to_string(angle) + " degrees = " + to_string(sin(result)));


    return 0;
}

// Cos

int cosine() {
    double angle, result;
    cin >> angle;
    result = angle * (M_PI / 180);
    cout << cos(result);
    saveToHistory("Cosine of " + to_string(angle) + " degrees = " + to_string(cos(result)));


    return 0;
}

// Tan

void tangent() {
    double angle, result;
    cin >> angle;

    if(angle == 90) {
        cout << "Math Error" << endl;
    } else {
        result = angle * (M_PI / 180);
        cout << tan(result);
        saveToHistory("Tangent of " + to_string(angle) + "  = " + to_string(tan(result)));


    }
}


 // Fact
void factorial(){

    int a;

    cin >> a;

    cout << fact(a);

    saveToHistory("Factorial of " + to_string(a) + " = " + to_string(fact(a)));
}



// Lo bhai , Conersions start

void conversion(){


    



        cout << "\n-------------------MATHEMATICAL CONVERSIONS-------------------\n";

        cout << "1. Kilometers(KM) to miles(M)" << endl
             << "2. Miles(M) to Kilometers(KM)" << endl
             << "3. Meter(m) to Inches(in)" << endl
             << "4. Inches(in) to meter(m)" << endl
             << "5. Feet(ft) to Inches(in)" << endl
             << "6. Inches(in) to Feet(ft)" << endl;

        cout << "\n-------------------WEIGHT CONVERSIONS-------------------\n";

        cout << "7. Pounds(lb) to Kilogram(kg)" << endl
             << "8. Kilogram(kg) to Pounds(lb)" << endl
             << "9. Pounds(lb) to Grams(g)" << endl
             << "10. Grams(g) to Pounds(lb)" << endl;

        cout << "\n-------------------TEMPERATURE CONVERSIONS-------------------\n";

        cout << "11. Celsius(C) to Fahrenheit(F)" << endl
             << "12. Fahrenheit(F) to Celsius(C)" << endl
             << "13. Fahrenheit(F) to Kelvin(K)" << endl
             << "14. Kelvin(K) to Fahrenheit(F)" << endl;




              int option;

    cout << "Enter choice number: ";
    cin >> option;



    switch (option) {

        case 1:
        
         km_to_miles();
         
          break;



        case 2: 
        
        miles_to_km();
        
         break;



        case 3:
        
         m_to_inches();
         
          break;



        case 4: 
        
        inches_to_m();
        
         break;



        case 5: 
        
        feet_to_inches();
        
         break;



        case 6: 
        
        inches_to_feet();
        
         break;



        case 7:
        
         lb_to_kg();
        
         break;



        case 8:
        
         kg_to_lb();
         
          break;



        case 9: 
        
        pounds_to_grams();
        
         break;



        case 10:
        
         grams_to_pounds();
         
          break;



        case 11:
        
         celcius_to_fehrenheit();
         
          break;



        case 12: 
        
        fehrenheit_to_celcius();
        
         break;



        case 13: 
        
        fehrenheit_to_kelvin();
        
         break;



        case 14:
        
         kelvin_to_fehrenheit();
         
          break;



        default: cout << "Invalid option!" << endl; break;



    }



}


void saveToHistory(const string &calculation) {


    ofstream historyFile("history.txt", ios::app); 
        historyFile << calculation << endl;  


   
}
