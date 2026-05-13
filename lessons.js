const LESSONS = {
  classes: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag blue">Core</span><span class="tag purple">Fundamentals</span></div>
      <h2>Classes & Objects</h2>
      <p class="subtitle">The blueprint and the instance — bringing real-world modeling to C++</p>
    </div>
    <p>A <strong>class</strong> is a user-defined blueprint. An <strong>object</strong> is an instance of that blueprint created at runtime.</p>
    <div class="section-title">Defining a Class</div>
    <pre>class Car {
public:
    string brand;
    int speed;
    void drive() {
        cout << brand << " going at " << speed << " km/h" << endl;
    }
};</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div>Members of a class are <code>private</code> by default. Use <code>public:</code> to expose them.</div></div>
    <div class="section-title">Constructors & Destructors</div>
    <pre>class Box {
    int length;
public:
    Box(int l) : length(l) { cout << "Box created\\n"; }  // Constructor
    ~Box()               { cout << "Box destroyed\\n"; } // Destructor
    int getLen()         { return length; }
};
Box b(10); // Box created
// when b goes out of scope => Box destroyed</pre>
    <div class="note-box tip"><i class="ti ti-bulb"></i><div>Use the <strong>initializer list</strong> (<code>: length(l)</code>) to initialize members — it's more efficient than assigning inside the body.</div></div>
  </div>`,

  encap: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag green">OOP</span></div>
      <h2>Encapsulation</h2>
      <p class="subtitle">Hiding data and exposing only what's necessary</p>
    </div>
    <p>Encapsulation bundles data and the methods that operate on that data. It restricts direct access using access specifiers.</p>
    <div class="section-title">Getters & Setters</div>
    <pre>class BankAccount {
private:
    double balance;
public:
    BankAccount() : balance(0) {}
    void deposit(double amount) {
        if (amount > 0) balance += amount;  // validation!
    }
    double getBalance() const { return balance; }
};</pre>
    <div class="note-box tip"><i class="ti ti-bulb"></i><div>Mark getters <code>const</code> — it signals they won't modify the object.</div></div>
    <div class="section-title">Access Specifiers Summary</div>
    <pre>class Base {
public:    int a;  // accessible everywhere
protected: int b;  // accessible in Base + derived classes
private:   int c;  // accessible ONLY inside Base
};</pre>
  </div>`,

  ptr: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag blue">Core concept</span><span class="tag amber">Memory</span></div>
      <h2>Pointers — <code>*</code></h2>
      <p class="subtitle">A pointer stores the memory address of another variable</p>
    </div>
    <p>Think of memory as a street of numbered houses. A pointer holds a house <em>number</em> — not the house itself.</p>
    <div class="section-title">Declaration & Basic Use</div>
    <pre>int x = 42;
int* ptr = &x;   // ptr holds the ADDRESS of x

cout << x;        // 42        — the value
cout << &x;       // 0x61ff08  — address of x
cout << ptr;      // 0x61ff08  — same address
cout << *ptr;     // 42        — dereference: VALUE at that address</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div><code>*</code> has two jobs:<br>1. In a <em>declaration</em> — marks it as a pointer type: <code>int* p;</code><br>2. As an <em>operator</em> — dereferences (reads the value): <code>*p</code></div></div>
    <div class="section-title">Modifying via Pointer</div>
    <pre>int a = 10;
int* p = &a;
*p = 99;        // changes 'a' through the pointer
cout << a;      // 99</pre>
    <div class="section-title">Pointer Arithmetic</div>
    <pre>int arr[] = {10, 20, 30};
int* p = arr;       // points to arr[0]

cout << *p;         // 10
cout << *(p+1);     // 20  — moves one int forward in memory
cout << *(p+2);     // 30

p++;                // advance pointer
cout << *p;         // 20</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div>Pointer arithmetic is scaled by the type size. <code>p+1</code> on an <code>int*</code> moves 4 bytes forward. On a <code>double*</code> it moves 8 bytes.</div></div>
    <div class="section-title">Null Pointer</div>
    <pre>int* p = nullptr;   // C++11 — safe empty pointer (use this!)
// int* p = NULL;   // old C style, avoid

if (p != nullptr) {
    cout << *p;     // always check before dereferencing!
}</pre>
    <div class="note-box danger"><i class="ti ti-alert-triangle"></i><div><strong>Danger:</strong> Dereferencing a null or uninitialized pointer causes undefined behavior / crash.</div></div>
    <div class="section-title">Pointer to Pointer</div>
    <pre>int x = 5;
int* p = &x;
int** pp = &p;   // pointer to a pointer

cout << **pp;    // 5 — double dereference

// Use case: modify a pointer from a function
void setPtr(int** pp, int* newTarget) {
    *pp = newTarget;   // changes where p points
}</pre>
    <div class="section-title">const Pointers — 3 Flavors</div>
    <pre>int a = 1, b = 2;

// 1. Pointer to const — can't change value, can change target
const int* p1 = &a;
// *p1 = 5;  // ERROR — value is read-only
p1 = &b;    // OK   — pointer can be reassigned

// 2. const Pointer — can't change target, can change value
int* const p2 = &a;
*p2 = 5;    // OK   — value is writable
// p2 = &b; // ERROR — pointer is fixed

// 3. const pointer to const — nothing can change
const int* const p3 = &a;
// *p3 = 5; // ERROR
// p3 = &b; // ERROR</pre>
    <div class="section-title">void* — Generic Pointer</div>
    <pre>void* vp;            // can hold address of ANY type

int  i = 10;
double d = 3.14;
vp = &i;             // OK
vp = &d;             // OK — rebind to different type

// Must cast before dereferencing:
cout << *(int*)vp;   // cast to int* first
// cout << *vp;      // ERROR — compiler doesn't know the type</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div><code>void*</code> is used in C-style generic functions (like <code>memcpy</code>). In modern C++, prefer templates instead.</div></div>
    <div class="section-title">Function Pointers</div>
    <pre>int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

// Declare a pointer to a function taking two ints, returning int:
int (*funcPtr)(int, int);

funcPtr = add;
cout << funcPtr(3, 2);  // 5 — calls add()

funcPtr = sub;
cout << funcPtr(3, 2);  // 1 — calls sub()

// Simpler with typedef or using:
using MathFunc = int(*)(int, int);
MathFunc f = add;</pre>
    <div class="note-box tip"><i class="ti ti-bulb"></i><div>Function pointers are the foundation of callbacks and strategy patterns in C. In modern C++, prefer <code>std::function</code> and lambdas.</div></div>
    <div class="section-title">Pointer to Class Object</div>
    <pre>class Dog {
public:
    string name;
    void bark() { cout << name << " says Woof!\n"; }
};

Dog d;
d.name = "Rex";

Dog* ptr = &d;        // pointer to object
ptr->name = "Max";   // use -> to access members via pointer
ptr->bark();          // Max says Woof!

// ptr->member  is the same as  (*ptr).member</pre>
    <div class="note-box warn"><i class="ti ti-alert-triangle"></i><div>A <strong>dangling pointer</strong> points to memory that has been freed. Always set <code>p = nullptr</code> after <code>delete p</code>.</div></div>
  </div>`,

  ref: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag blue">Core concept</span></div>
      <h2>References — <code>&</code></h2>
      <p class="subtitle">A reference is an alias — another name for an existing variable</p>
    </div>
    <p>Once bound, a reference <em>is</em> the variable — you can't rebind it or make it null.</p>
    <div class="section-title">Declaration & Aliasing</div>
    <pre>int x = 10;
int& ref = x;   // ref is now an alias for x

ref = 99;
cout << x;      // 99 — x changed through ref!
cout << &x;     // same address as &ref
cout << &ref;   // same address — they're the same variable</pre>
    <div class="section-title">Pass-by-Reference</div>
    <pre>// Without reference — only the copy changes
void addTen(int n) { n += 10; }

// With reference — original changes
void addTenRef(int& n) { n += 10; }

int val = 5;
addTen(val);       // val still 5
addTenRef(val);    // val is now 15</pre>
    <div class="section-title">Swap using References</div>
    <pre>void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int x = 3, y = 7;
swap(x, y);
cout << x << " " << y;  // 7 3</pre>
    <div class="section-title">const Reference (read-only alias)</div>
    <pre>// Cheap: no copy. Safe: can't modify.
void printName(const string& s) {
    cout << s;
    // s += "!"; // ERROR — const ref is read-only
}

// const refs can bind to LITERALS (temporaries):
const int& r = 42;   // valid! (non-const ref would fail)
cout << r;           // 42</pre>
    <div class="note-box tip"><i class="ti ti-bulb"></i><div>Always pass large objects (strings, vectors, structs) as <code>const&</code> to avoid expensive copies while preventing accidental modification.</div></div>
    <div class="section-title">Return by Reference</div>
    <pre>int arr[5] = {10, 20, 30, 40, 50};

// Returns a reference to arr[i] — caller can modify it!
int& getElement(int i) {
    return arr[i];
}

getElement(2) = 99;   // directly modifies arr[2]
cout << arr[2];       // 99</pre>
    <div class="note-box danger"><i class="ti ti-alert-triangle"></i><div><strong>Never</strong> return a reference to a local variable! The local is destroyed when the function returns — you get a dangling reference.</div></div>
    <div class="section-title">Reference to Pointer</div>
    <pre>int a = 5, b = 10;
int* p = &a;

// A reference to a pointer — lets you change where p points
void redirect(int*& ptr, int* newTarget) {
    ptr = newTarget;
}

redirect(p, &b);
cout << *p;  // 10 — p now points to b</pre>
    <div class="section-title">Rvalue References (C++11) — &&</div>
    <pre>int x = 5;
int& lref = x;    // lvalue reference — binds to named variable
// int& r = 10;   // ERROR — can't bind lvalue ref to literal

int&& rref = 10;  // rvalue reference — binds to temporary!
rref = 20;        // OK
cout << rref;     // 20

// Main use: move semantics (avoid unnecessary copies)
void process(string&& s) {
    // s is a temporary — we can "steal" its resources
    string local = std::move(s);  // moves, doesn't copy
}</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div>Rvalue references (<code>&&</code>) enable <strong>move semantics</strong> in C++11 — transferring resources from temporaries instead of copying them, dramatically improving performance for large objects.</div></div>
    <div class="section-title">Reference vs Pointer — Summary</div>
    <pre>// Reference                  Pointer
int& r = x;    // must init   int* p = &x;  // can be null
r = 20;        // just assign  *p = 20;      // must dereference
               // can't rebind p = &y;       // can point elsewhere
               // no null      p = nullptr;  // can be null
               // no sizeof    sizeof(p) = 8 // has size</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div>Use <strong>references</strong> when you always have a valid object. Use <strong>pointers</strong> when you need null, rebinding, arrays, or dynamic memory.</div></div>
  </div>`,

  addr: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag amber">Memory</span></div>
      <h2>Addresses & Memory Layout</h2>
      <p class="subtitle">Every variable lives at a unique address in RAM</p>
    </div>
    <div class="section-title">The Address-of Operator &</div>
    <pre>int a = 10;
double b = 3.14;
char c = 'Z';

cout << &a;   // e.g. 0x7ffd5e3c1a4c
cout << &b;   // e.g. 0x7ffd5e3c1a50
cout << &c;   // e.g. 0x7ffd5e3c1a58</pre>
    <div class="section-title">Stack vs Heap</div>
    <pre>void func() {
    int x = 5;            // STACK — automatic, freed when func() ends
    int* p = new int(99); // HEAP — manual, you must delete it
    delete p;
}

// Stack: fast, limited size (~1-8 MB), auto-managed
// Heap:  slower, large (GBs), you manage lifetime</pre>
    <div class="section-title">Pointer Size</div>
    <pre>cout << sizeof(int*);    // 8 bytes on 64-bit systems
cout << sizeof(double*); // 8 bytes — ALL pointers same size
cout << sizeof(char*);   // 8 bytes</pre>
    <div class="section-title">Address Arithmetic Example</div>
    <pre>int arr[3] = {10, 20, 30};
cout << arr;       // address of arr[0], e.g. 0x1000
cout << arr+1;     // 0x1004 — +4 bytes (int = 4 bytes)
cout << arr+2;     // 0x1008

// Arrays are just pointers to their first element!
cout << arr[1];    // same as *(arr+1) = 20</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div>On a 64-bit system: <code>int</code>=4 bytes, <code>double</code>=8 bytes, <code>char</code>=1 byte, <code>pointer</code>=8 bytes.</div></div>
  </div>`,

  thisptr: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag green">OOP</span><span class="tag blue">Internals</span></div>
      <h2>The <code>this</code> Pointer & <code>*this</code></h2>
      <p class="subtitle">Every member function receives a hidden pointer to its own object</p>
    </div>
    <p>When you call <code>obj.func()</code>, C++ secretly passes the memory address of <code>obj</code> as a hidden parameter named <code>this</code> inside <code>func</code>.</p>
    <div class="section-title">What is 'this'?</div>
    <pre>class Dog {
    string name;
public:
    Dog(string name) {
        // 'this' is a pointer: Dog* const this;
        this->name = name; // resolves name conflict
    }
    void printAddress() {
        cout << "My address is: " << this << endl;
    }
};</pre>
    <div class="section-title">What is '*this'?</div>
    <p>If <code>this</code> is the pointer to the object, then <code>*this</code> is the <strong>object itself</strong> (dereferenced pointer). You use <code>*this</code> when you need to return the actual object, usually by reference.</p>
    <div class="section-title">Returning *this — Method Chaining</div>
    <pre>class Builder {
    int value = 0;
public:
    // Returns a REFERENCE to the current object
    Builder& add(int n) { 
        value += n; 
        return *this; 
    }
    Builder& multiply(int n) { 
        value *= n; 
        return *this; 
    }
    void show() { cout << value << endl; }
};

Builder b;
// Chaining works because each method returns the object itself
b.add(5).multiply(3).add(2).show(); // 17</pre>
    <div class="note-box warn"><i class="ti ti-alert-triangle"></i><div>If you return <code>*this</code> by <em>value</em> (e.g., <code>Builder add()</code> instead of <code>Builder& add()</code>), C++ creates a <strong>copy</strong> of the object at each step, breaking the chain! Always return by reference <code>&</code> for chaining.</div></div>
    <div class="section-title">delete this;</div>
    <pre>class SuicideTask {
public:
    void complete() {
        // ... finish work ...
        delete this; // object destroys itself!
    }
};</pre>
    <div class="note-box danger"><i class="ti ti-alert-triangle"></i><div><code>delete this;</code> is legal but very dangerous. The object MUST have been allocated with <code>new</code>, and you cannot touch any member variables after executing it.</div></div>
  </div>`,

  inh: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag green">OOP</span></div>
      <h2>Inheritance</h2>
      <p class="subtitle">Derived classes inherit members from a base class ("is-a" relationship)</p>
    </div>
    <div class="section-title">Basic Inheritance</div>
    <pre>class Animal {           // Base class
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    void eat() { cout << name << " eats." << endl; }
};

class Dog : public Animal {   // Derived class
public:
    Dog(string n) : Animal(n) {} // call base constructor
    void bark() { cout << name << " barks!" << endl; }
};

Dog d("Rex");
d.eat();    // inherited from Animal
d.bark();   // Dog's own method</pre>
    <div class="section-title">Access Specifiers in Inheritance</div>
    <pre>class Base {
public:    int pub;    // accessible everywhere
protected: int prot;  // accessible in Base + derived classes
private:   int priv;  // accessible ONLY in Base
};

class Child : public Base {
    void test() {
        pub = 1;   // OK
        prot = 2;  // OK (protected)
        // priv = 3; // ERROR — private
    }
};</pre>
    <div class="section-title">Method Overriding</div>
    <pre>class Shape {
public:
    virtual void draw() {           // virtual = can be overridden
        cout << "Drawing shape" << endl;
    }
};

class Circle : public Shape {
public:
    void draw() override {          // override keyword — safety check
        cout << "Drawing circle" << endl;
    }
};</pre>
    <div class="section-title">Constructor Chain</div>
    <pre>class Vehicle {
public:
    Vehicle(int speed) { cout << "Vehicle: " << speed << endl; }
};
class Car : public Vehicle {
public:
    Car(int s, string brand) : Vehicle(s) {   // calls base first
        cout << "Car: " << brand << endl;
    }
};
// Output: Vehicle: 120
//         Car: Toyota</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div>Base class constructor is <strong>always</strong> called before the derived class constructor.</div></div>
  </div>`,

  poly: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag green">OOP</span></div>
      <h2>Polymorphism</h2>
      <p class="subtitle">Same interface, different behavior — resolved at runtime</p>
    </div>
    <div class="section-title">Runtime Polymorphism (virtual)</div>
    <pre>class Animal {
public:
    virtual void speak() { cout << "..." << endl; }
    virtual ~Animal() {}    // ALWAYS virtual destructor!
};

class Cat : public Animal {
public:
    void speak() override { cout << "Meow!" << endl; }
};

class Dog : public Animal {
public:
    void speak() override { cout << "Woof!" << endl; }
};

Animal* a1 = new Cat();
Animal* a2 = new Dog();
a1->speak();   // Meow!  — decided at RUNTIME
a2->speak();   // Woof!
delete a1; delete a2;</pre>
    <div class="section-title">Abstract Classes & Pure Virtual</div>
    <pre>class Shape {
public:
    virtual double area() = 0;  // pure virtual — MUST override
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() override { return 3.14159 * r * r; }
};

// Shape s;  // ERROR — can't instantiate abstract class
Shape* s = new Circle(5.0);
cout << s->area();  // 78.54</pre>
    <div class="section-title">Compile-time Polymorphism (overloading)</div>
    <pre>int add(int a, int b)          { return a + b; }
double add(double a, double b) { return a + b; }
string add(string a, string b) { return a + b; }

add(1, 2);           // int version
add(1.5, 2.5);       // double version
add("Hi", " C++");   // string version</pre>
    <div class="note-box info"><i class="ti ti-info-circle"></i><div>Runtime polymorphism needs <code>virtual</code> + base class pointer/reference. Compile-time polymorphism is just function overloading — decided at compile time.</div></div>
  </div>`,

  vtable: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag green">OOP</span><span class="tag amber">Internals</span></div>
      <h2>vtable & Virtual Dispatch</h2>
      <p class="subtitle">How C++ implements runtime polymorphism under the hood</p>
    </div>
    <div class="section-title">What is a vtable?</div>
    <p>When a class has <code>virtual</code> functions, the compiler creates a hidden <strong>vtable</strong> (virtual function table) — an array of function pointers, one per virtual function.</p>
    <p>Each object of that class gets a hidden <strong>vptr</strong> (virtual pointer) — a pointer to its class's vtable.</p>
    <div class="section-title">How virtual dispatch works</div>
    <pre>class Animal {
public:
    virtual void speak() { cout << "..." << endl; }
};
class Dog : public Animal {
public:
    void speak() override { cout << "Woof!" << endl; }
};

// Memory layout of a Dog object:
// [ vptr ] --> Dog's vtable: [ &Dog::speak ]
// [ ... other members ... ]

Animal* a = new Dog();
a->speak();
// CPU: read vptr from *a
//      look up speak in vtable
//      call Dog::speak  => "Woof!"</pre>
    <div class="section-title">Virtual Destructor — why it matters</div>
    <pre>class Base {
public:
    ~Base() { cout << "~Base" << endl; }  // NOT virtual!
};
class Derived : public Base {
public:
    ~Derived() { cout << "~Derived" << endl; }
};

Base* b = new Derived();
delete b;  // ONLY ~Base called! Derived destructor skipped!
           // => memory/resource leak

// FIX: make destructor virtual in Base
virtual ~Base() { ... }</pre>
    <div class="section-title">override & final</div>
    <pre>class A {
    virtual void foo() {}
    virtual void bar() {}
};
class B : public A {
    void foo() override {}  // override — compiler checks it exists in A
    void bar() final {}     // final — no further overriding allowed
};
class C : public B {
    // void bar() override {} // ERROR — bar is final in B
};</pre>
    <div class="note-box danger"><i class="ti ti-alert-triangle"></i><div><strong>Rule:</strong> If a class has ANY virtual function, its destructor must also be <code>virtual</code>.</div></div>
  </div>`,

  opover: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag purple">Advanced</span></div>
      <h2>Operator Overloading</h2>
      <p class="subtitle">Customizing operator behavior for user-defined types</p>
    </div>
    <p>You can redefine how operators like <code>+</code>, <code>-</code>, <code>==</code>, <code>&lt;&lt;</code> work when applied to objects of your classes. It makes custom types feel like built-in types.</p>
    <div class="section-title">Binary Operators: Vector Addition</div>
    <pre>class Vector2D {
public:
    int x, y;
    Vector2D(int x, int y) : x(x), y(y) {}

    // Overloading the '+' operator
    Vector2D operator+(const Vector2D& other) const {
        return Vector2D(x + other.x, y + other.y);
    }
    
    // Overloading the '==' operator
    bool operator==(const Vector2D& o) const {
        return x == o.x && y == o.y;
    }
};

Vector2D v1(1, 2), v2(3, 4);
Vector2D v3 = v1 + v2;  // internally calls: v1.operator+(v2)</pre>
    <div class="section-title">Unary Operators: Pre/Post Increment</div>
    <pre>class Counter {
    int count = 0;
public:
    // Pre-increment: ++c
    Counter& operator++() {
        count++;
        return *this;
    }
    
    // Post-increment: c++ (int parameter is a dummy to differentiate)
    Counter operator++(int) {
        Counter temp = *this; // save old state
        count++;              // increment current
        return temp;          // return old state
    }
};</pre>
    <div class="section-title">Overloading &lt;&lt; (Stream Output)</div>
    <p>To use <code>cout &lt;&lt; obj</code>, you must overload <code>&lt;&lt;</code>. Since the left operand is <code>cout</code> (an <code>ostream</code> object, not your class), it <strong>cannot</strong> be a member function. It must be a global <code>friend</code> function.</p>
    <pre>class Point {
    int x, y;
public:
    Point(int x, int y) : x(x), y(y) {}

    // friend gives this non-member function access to private x, y
    friend ostream& operator<<(ostream& os, const Point& p) {
        os << "(" << p.x << ", " << p.y << ")";
        return os; // return stream to allow chaining: cout << p1 << p2;
    }
};

Point p(3, 7);
cout << p;  // prints: (3, 7)</pre>
    <div class="note-box warn"><i class="ti ti-alert-triangle"></i><div>Not all operators can be overloaded. You <strong>cannot</strong> overload: <code>::</code> (scope), <code>.</code> (member access), <code>.*</code> (pointer to member), <code>?:</code> (ternary), and <code>sizeof</code>.</div></div>
  </div>`,

  dyn: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag amber">Memory</span></div>
      <h2>Dynamic Memory Allocation</h2>
      <p class="subtitle">Allocate memory at runtime on the heap</p>
    </div>
    <div class="section-title">new / delete — Single Object</div>
    <pre>int* p = new int(42);    // allocate one int on heap
cout << *p;              // 42
delete p;                // FREE it — crucial!
p = nullptr;             // good practice after delete</pre>
    <div class="section-title">new[] / delete[] — Arrays</div>
    <pre>int n = 5;
int* arr = new int[n];   // heap array of 5 ints

for (int i = 0; i < n; i++)
    arr[i] = i * 10;

delete[] arr;            // MUST use delete[] for arrays!</pre>
    <div class="note-box danger"><i class="ti ti-alert-triangle"></i><div><strong>Common mistakes:</strong><br>• Forgetting <code>delete</code> → memory leak<br>• Using <code>delete</code> on array (<code>delete[]</code> required) → undefined behavior<br>• Using pointer after <code>delete</code> → dangling pointer crash</div></div>
    <div class="section-title">Smart Pointers (Modern C++11+)</div>
    <pre>#include &lt;memory&gt;

// unique_ptr — sole owner, auto-deletes
unique_ptr&lt;int&gt; u = make_unique&lt;int&gt;(99);
cout << *u;  // 99
// no delete needed — freed when u goes out of scope!

// shared_ptr — shared ownership, ref-counted
shared_ptr&lt;int&gt; s1 = make_shared&lt;int&gt;(7);
shared_ptr&lt;int&gt; s2 = s1;  // both own it
// freed when ALL shared_ptrs go out of scope</pre>
    <div class="note-box tip"><i class="ti ti-bulb"></i><div><strong>Best practice:</strong> Prefer <code>make_unique</code> and <code>make_shared</code> over raw <code>new</code>. They prevent leaks automatically.</div></div>
  </div>`,

  templates: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag purple">Advanced</span></div>
      <h2>Templates</h2>
      <p class="subtitle">Generic programming — write once, use for any type</p>
    </div>
    <div class="section-title">Function Templates</div>
    <pre>template &lt;typename T&gt;
T myMax(T x, T y) {
    return (x > y) ? x : y;
}

cout << myMax&lt;int&gt;(3, 7);       // 7
cout << myMax&lt;double&gt;(3.5, 2.1); // 3.5
cout << myMax&lt;char&gt;('A', 'Z');   // Z</pre>
    <div class="section-title">Class Templates</div>
    <pre>template &lt;typename T&gt;
class Stack {
    T data[100];
    int top = -1;
public:
    void push(T val) { data[++top] = val; }
    T pop()          { return data[top--]; }
    bool empty()     { return top == -1; }
};

Stack&lt;int&gt;    si;  si.push(10); si.push(20);
Stack&lt;string&gt; ss;  ss.push("hello");</pre>
    <div class="note-box warn"><i class="ti ti-alert-triangle"></i><div>Template type deduction fails when you pass mismatched types: <code>myMax(5, 5.5)</code> is a compilation error. Use <code>myMax&lt;double&gt;(5, 5.5)</code> explicitly.</div></div>
  </div>`,

  stl: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag cyan">Library</span></div>
      <h2>STL Containers</h2>
      <p class="subtitle">Ready-to-use generic data structures in the Standard Template Library</p>
    </div>
    <div class="section-title">std::vector — Dynamic Array</div>
    <pre>#include &lt;vector&gt;
vector&lt;int&gt; v = {1, 2, 3};
v.push_back(4);        // add to end
cout << v[2];          // 3 — random access O(1)
v.erase(v.begin()+1);  // remove element at index 1</pre>
    <div class="section-title">std::map — Sorted Key-Value</div>
    <pre>#include &lt;map&gt;
map&lt;string, int&gt; scores;
scores["Alice"] = 95;
scores["Bob"]   = 87;
for (auto& [name, score] : scores)
    cout << name << ": " << score << "\n";</pre>
    <div class="section-title">std::unordered_map — Hash Table</div>
    <pre>#include &lt;unordered_map&gt;
unordered_map&lt;string, int&gt; freq;
freq["apple"]++;
freq["banana"] += 3;
cout << freq["apple"];  // 1 — O(1) average lookup</pre>
    <div class="section-title">Container Comparison</div>
    <pre>// vector  — fast random access, slow middle insert
// list    — fast insert/delete anywhere, no random access
// map     — sorted, O(log n) operations
// unordered_map — O(1) average, unsorted</pre>
  </div>`,

  exceptions: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag amber">Advanced</span></div>
      <h2>Exception Handling</h2>
      <p class="subtitle">Dealing with runtime anomalies gracefully using try / catch / throw</p>
    </div>
    <div class="section-title">Basic Syntax</div>
    <pre>try {
    int age = 15;
    if (age < 18)
        throw age;       // throw any type!
    cout << "Access granted";
}
catch (int myNum) {
    cout << "Denied. Age was: " << myNum;
}</pre>
    <div class="section-title">Multiple catch Blocks</div>
    <pre>try {
    throw string("File not found");
}
catch (int e)         { cout << "Int error: " << e; }
catch (string& e)     { cout << "String error: " << e; }
catch (...)           { cout << "Unknown error"; }  // catch-all</pre>
    <div class="section-title">Standard Exception Classes</div>
    <pre>#include &lt;stdexcept&gt;

try {
    throw runtime_error("Something went wrong!");
}
catch (const exception& e) {
    cout << e.what();  // "Something went wrong!"
}</pre>
    <div class="note-box tip"><i class="ti ti-bulb"></i><div>Prefer throwing objects derived from <code>std::exception</code>. Always catch by <code>const reference</code> to avoid copying and slicing.</div></div>
  </div>`,

  copyctor: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag blue">Core</span><span class="tag purple">Advanced</span></div>
      <h2>Copy Constructor</h2>
      <p class="subtitle">Controlling how objects are duplicated — deep vs shallow copy</p>
    </div>
    <p>A <strong>copy constructor</strong> initializes a new object as a copy of an existing object. If you don't write one, the compiler generates a default that does a <em>shallow copy</em>.</p>
    <div class="section-title">Shallow vs Deep Copy Problem</div>
    <pre>class Bad {
    int* data;
public:
    Bad(int v) { data = new int(v); }
    ~Bad()     { delete data; }
    // NO copy constructor — compiler does shallow copy!
};
Bad a(10);
Bad b = a;  // b.data and a.data point to SAME memory!
            // When a and b are destroyed => double delete => CRASH</pre>
    <div class="note-box danger"><i class="ti ti-alert-triangle"></i><div><strong>Shallow copy</strong> copies the pointer value — both objects share the same heap memory. Destroying either one corrupts the other.</div></div>
    <div class="section-title">Writing a Deep Copy Constructor</div>
    <pre>class Good {
    int* data;
public:
    Good(int v) : data(new int(v)) {}
    // Deep copy constructor:
    Good(const Good& other) : data(new int(*other.data)) {}
    ~Good() { delete data; }
};

Good a(10);
Good b = a;   // b gets its OWN copy of data — safe!
*b.data = 99; // does NOT affect a</pre>
    <div class="section-title">Rule of Three</div>
    <pre>// If you define any one of these, define all three:
class MyClass {
    // 1. Destructor
    ~MyClass();
    // 2. Copy Constructor
    MyClass(const MyClass& other);
    // 3. Copy Assignment Operator
    MyClass& operator=(const MyClass& other);
};</pre>
    <div class="note-box tip"><i class="ti ti-bulb"></i><div><strong>Modern C++11+</strong> extends this to the <em>Rule of Five</em> by adding Move Constructor and Move Assignment Operator for efficiency.</div></div>
  </div>`,

  static: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag cyan">Class Feature</span></div>
      <h2>Static Members</h2>
      <p class="subtitle">Shared across all instances — belongs to the class, not any object</p>
    </div>
    <p>A <code>static</code> member variable has <strong>one copy shared by all objects</strong> of the class. A <code>static</code> member function can be called without creating an object.</p>
    <div class="section-title">Static Variable</div>
    <pre>class Counter {
public:
    static int count;  // declaration
    Counter()  { count++; }
    ~Counter() { count--; }
};
int Counter::count = 0;  // definition (outside class!)

Counter a, b, c;
cout << Counter::count;  // 3 — shared across all instances</pre>
    <div class="section-title">Static Member Function</div>
    <pre>class MathUtils {
public:
    static int square(int x) { return x * x; }
    static double pi()       { return 3.14159; }
};

// Call WITHOUT creating an object:
cout << MathUtils::square(5);  // 25
cout << MathUtils::pi();       // 3.14159</pre>
    <div class="note-box warn"><i class="ti ti-alert-triangle"></i><div>A <code>static</code> member function has <strong>no <code>this</code> pointer</strong> — it cannot access non-static member variables directly.</div></div>
  </div>`,

  friend: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag purple">Advanced</span></div>
      <h2>Friend Functions & Classes</h2>
      <p class="subtitle">Controlled breaking of encapsulation: granting external access</p>
    </div>
    <p>Normally, private data is strictly hidden. The <code>friend</code> keyword acts as a "VIP pass", allowing a specific external function or an entirely different class to read and modify private and protected members.</p>
    <div class="section-title">Friend Function</div>
    <p>A friend function is declared inside the class but is <strong>not</strong> a member of the class. It doesn't have a <code>this</code> pointer.</p>
    <pre>class BankAccount {
    double balance;
public:
    BankAccount(double b) : balance(b) {}
    
    // Declare an external function as a friend
    friend void printBalance(const BankAccount& acc);  
};

// Definition: NOT tied to BankAccount::
void printBalance(const BankAccount& acc) {
    // Accessing private member directly!
    cout << "Balance: $" << acc.balance << endl;  
}

BankAccount myAcc(1500.50);
printBalance(myAcc);</pre>
    <div class="section-title">Friend Class</div>
    <p>You can make an entire class a friend. Every method of the friend class can access the private members of your class.</p>
    <pre>class Engine;  // forward declaration

class Car {
    int horsepower = 300;
    
    // Grant Engine full access to Car's privates
    friend class Engine;  
};

class Engine {
public:
    void tune(Car& c) {
        c.horsepower += 50;  // OK because Engine is a friend
        cout << "Tuned to " << c.horsepower << " HP!" << endl;
    }
};</pre>
    <div class="section-title">Multiple Friends & Interaction</div>
    <pre>class Rectangle; // forward declaration

class Square {
    int side;
public:
    Square(int s) : side(s) {}
    // friend function taking objects of TWO different classes
    friend void compare(const Square& s, const Rectangle& r);
};

class Rectangle {
    int width, height;
public:
    Rectangle(int w, int h) : width(w), height(h) {}
    friend void compare(const Square& s, const Rectangle& r);
};

// Can access privates of BOTH Square and Rectangle
void compare(const Square& s, const Rectangle& r) {
    int sqArea = s.side * s.side;
    int rectArea = r.width * r.height;
    if (sqArea > rectArea) cout << "Square is larger";
}</pre>
    <div class="note-box danger"><i class="ti ti-alert-triangle"></i><div>Friendship breaks encapsulation. Use it only when necessary (like overloaded operators or tight internal coupling).</div></div>
    <div class="note-box warn"><i class="ti ti-alert-triangle"></i><div>Friendship is <strong>not inherited</strong> (a child of a friend isn't a friend), <strong>not mutual</strong> (if I am your friend, you aren't automatically mine), and <strong>not transitive</strong> (a friend of a friend is not a friend).</div></div>
  </div>`,

  multinh: `<div class="lesson">
    <div class="lesson-header">
      <div class="tag-row"><span class="tag green">OOP</span><span class="tag amber">Advanced</span></div>
      <h2>Multiple Inheritance</h2>
      <p class="subtitle">A class can inherit from more than one base class</p>
    </div>
    <div class="section-title">Basic Multiple Inheritance</div>
    <pre>class Flyable {
public:
    void fly() { cout << "Flying!" << endl; }
};

class Swimmable {
public:
    void swim() { cout << "Swimming!" << endl; }
};

class Duck : public Flyable, public Swimmable {
public:
    void quack() { cout << "Quack!" << endl; }
};

Duck d;
d.fly();   // from Flyable
d.swim();  // from Swimmable
d.quack(); // Duck's own</pre>
    <div class="section-title">The Diamond Problem</div>
    <pre>class A { public: void hello() { cout << "A"; } };
class B : public A {};
class C : public A {};
class D : public B, public C {};

D obj;
// obj.hello(); // AMBIGUOUS — which 'A'? B's or C's?
obj.B::hello(); // resolve explicitly</pre>
    <div class="section-title">Virtual Inheritance — solving the diamond</div>
    <pre>class A { public: int val = 10; };
class B : virtual public A {};  // virtual inheritance
class C : virtual public A {};  // virtual inheritance
class D : public B, public C {};

D obj;
cout << obj.val;  // 10 — only ONE copy of A, no ambiguity!</pre>
    <div class="note-box warn"><i class="ti ti-alert-triangle"></i><div>Use <code>virtual</code> inheritance sparingly — it adds overhead (extra pointer per object). Prefer composition over multiple inheritance when possible.</div></div>
  </div>`
};
