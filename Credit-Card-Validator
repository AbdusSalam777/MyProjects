#include<iostream>
#include<fstream>
using namespace std;



                                        //code for credit card checker


void reverseNum(int* arr, int size);



void doubleSecondDigit(int* arr, int size, int index);


void addAllDigits(int* arr, int size, int& sum);


void cardCheck(int* first_element);


void validity(int &sum, int* first_element);


class detail {

    public:
 string name;
 int age;
 int cvv;
 int id_card_number;
 string province;
 string city;
 string bank_name;
};


int main() {


    cout<<"Enter your credit card number : "<<endl;
    
    int sum = 0;
    
    int size = 16;

    int* arr = new int [size];


    for (int i = 0; i < size; i++) {
        cin >> arr[i];
    }


    int* first_element =new int;

    *first_element = *arr;


    reverseNum(arr, size);

    doubleSecondDigit(arr, size, 1);

    addAllDigits(arr, size, sum);

    validity(sum, first_element);

    /////

    //code for file handling

 


   detail user; 


  int choice;


   cout<<"\nIf you want to store data press 1 if you want to search data press 2"<<endl;
   cin>>choice;

   if(choice==1){

    ofstream outfile("user_detail.txt");


  if(outfile.is_open()){


    cout<<"Enter name : "<<endl;
    cin>>user.name;

    cout<<"Enter age : "<<endl;
    cin>>user.age;
    
     cout<<"Enter cvv : "<<endl;
    cin>>user.cvv;

   cout<<"Enter province: "<<endl;
    cin>>user.province;

   cout<<"Enter city: "<<endl;
    cin>>user.city;

    cout<<"Enter bank name: "<<endl;
    cin>>user.bank_name;

    outfile<<user.name<<endl;

    outfile<<user.age<<endl;

    outfile<<user.cvv<<endl;

    outfile<<user.province<<endl;

    outfile<<user.city<<endl;

    outfile<<user.bank_name<<endl;

   
    string name;

   ifstream infile("user_detail.txt");
   
   if(infile.is_open()){   
    
       string extract;

    cout<<"Enter name to check details : "<<endl;
    cin>>name;
   
   if(user.name==name){

  cout<<"YOUR DETAILS ARE : "<<endl;

    while(getline(infile,extract)){

  cout<<extract<<endl;

          }
  }
  
  if(user.name!=name){

    while(user.name!=name){


    cout<<"Enter name again : "<<endl;
    cin>>name;

  
    
     if(user.name==name){


    while(getline(infile,extract)){


   cout<<extract<<endl;
                             }
                      }
 
                }
           }
     }
}
     
   
   if(choice==2){


   cout<<"N0 Details Found ! "<<endl;


  cout<<"Please store your details first kindly ! "<<endl;

   
          }
       
  }











  
}


  void reverseNum(int* arr, int size) {

    int* start = arr;

    int* end = arr + size - 1;

    while (start < end) {

        int temp = *start;

        *start = *end;

        *end = temp;

        start++;

        end--;
    }


}
 void doubleSecondDigit(int* arr, int size, int index) {


    if (index >= size) {

        return;

    }

    *(arr + index) *= 2;

    if (*(arr + index) > 9) {

        *(arr + index) = *(arr + index) - 9;

    }


    doubleSecondDigit(arr, size, index + 2);
}


void addAllDigits(int* arr, int size, int& sum) {


    for (int i = 0; i < size; i++) {

        sum += arr[i];
        

}

}


void validity(int &sum, int *first_element){


    if (sum % 10 == 0) {

        cout << "\nThis is a valid card number!" << endl;

        cout << endl;

    
        cardCheck(first_element);
    } 
    
    else {
        
        cout << "This card number is not valid X"<<endl;
    }
}


void cardCheck(int* first_element) {


    if (*first_element == 4) {


        cout << "--------Visa--------";

    } 

    
    else if (*first_element == 2 || *first_element == 5) {


        cout << "--------MasterCard--------";
    } 

    
    else {
        cout << "--------Unknown--------";
    }





}


                                     
