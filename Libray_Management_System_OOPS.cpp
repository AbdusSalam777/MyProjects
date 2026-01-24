#include<iostream>
#include<cmath>
#include<fstream>
 
using namespace std;

int Generate_passkey() {   //function to generate passkey


    srand(time(0));

    int passkey;

    passkey = 1500 + rand() % 2000;

    return passkey;


}

class Book {    //class of book

public:
    string title;

    string author;

    string status;

};

class Member {  //class of member

public:

    int age;

    string name;

    string gender;

    int passkey;

    Member(int age, string name, string gender, int passkey) {  //parameterized constructor 


        this->age = age;

        this->name = name;

        this->gender = gender;

        this->passkey = passkey;

    }

    void display() { //method to display the details of the member

        cout << "\nYOUR DETAILS ARE : " << endl;

        cout << "Name: " << name << endl;

        cout << "Age: " << age << endl;

        cout << "Gender: " << gender << endl;

        cout << "Passkey: " << passkey << endl;
    }

    void CreateFile() { //using file handling

        ofstream userfile("user_detail.txt");

        if (userfile.is_open()) {  //create a file to store the user details

            userfile << "NAME : " << name << endl;

            userfile << "AGE : " << age << endl;

            userfile << "GENDER : " << gender << endl;

            userfile << "PASSKEY : " << passkey << endl;
        }
    }

    void readfile() {

        ifstream userfile("books.txt");

        if (userfile.is_open()) {

            string extract;

            while (getline(userfile, extract)) {

                cout << extract << endl;

            }
        }
    }

    void searching() {

        string bookname;

        cout << "\nEnter the name of the book you want to borrow : " << endl;

        cin >> bookname;

        ifstream searchfile("books.txt");

        if (searchfile.is_open()) {


            string str;

            while (getline(searchfile, str)) {

                if (str.find(bookname) != string::npos) {


                    ofstream bookfile("user_detail.txt", ios::app);


                    if (bookfile.is_open()) {

                        bookfile << "Borrowed Book: " << bookname << endl;

                        cout << "The book '" << bookname << "' has been borrowed and recorded." << endl;


                    }
                }
            }
        }
    }
};

class Librarian : public Member {  //derived class of Librarian


public:

    Librarian(int age, string name, string gender, int passkey, int grade) : Member(age, name, gender, passkey) {}

    void addtofile() {

        cout << "Hello world" << endl;
    }

};

int main() {  //Main function

    Book b;

    cout << "---------- WELCOME TO LIBRARY MANAGEMENT SYSTEM ----------" << endl << endl;


    cout << "        ------ PLEASE SIGN IN TO PROGRESS ------" << endl << endl;

    cout << "Press Y to generate your pass key ";

    char choice;

    cin >> choice;

    int pk;

    int passkey;

    if (choice == 'Y' || choice == 'y') {

        pk = Generate_passkey();

    }

    cout << "\nYOUR PASSKEY IS : " << endl << pk << endl << "\nRMEMBER IT FOR FUTURE REFERENCE" << endl;

    string name;

    cout << "\nENTER YOUR NAME : ";
    cin >> name;

    int age;

    cout << "\nENTER YOUR AGE : ";
    cin >> age;

    string gender;

    cout << "\nENTER YOUR gender : ";
    cin >> gender;

    cout << "\nENTER YOUR PASSKEY : ";
    cin >> passkey;

    if (passkey != pk) {

        while (passkey != pk) {

            cout << "\nPLEASE ENTER A VALID PASSKEY : ";

            cin >> passkey;

            if (passkey == pk) {

                cout << "VALID PASSKEY ENTERED " << endl;


            }
        }
    }


    Member m(age, name, gender, passkey);  //used a parameterized constructor to initialize the member object


    m.display(); //member function to display the details of the member

    m.CreateFile();

    cout << "\nDO YOU WANT TO SEARCH FOR A BOOK IN OUR LIBRARY ? " << endl;

    cin >> choice;

    if (choice == 'Y' || choice == 'y') {

        cout << "THE DETAILS OF THE BOOKS ARE : " << endl;

        m.readfile(); //member function to display the details of the books in the file
    }

    cout << "\nDO YOU WANT TO BORROW A BOOK? (Y/N): ";

    cin >> choice;

    if (choice == 'Y' || choice == 'y') {
      
        m.searching(); //member function to search and borrow a book
    }

    return 0;
}
