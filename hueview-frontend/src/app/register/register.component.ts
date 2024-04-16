import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)], [this.passwordValidator]]
    });
    
  }

  passwordValidator(control: FormControl): Promise<{ [key: string]: any } | null> {
    return new Promise(resolve => {
      const regex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?])');
      const valid = regex.test(control.value);
      if (!valid) {
        const errors = [];
        if (!/[A-Z]/.test(control.value)) {
          errors.push('an uppercase letter');
        }
        if (!/[a-z]/.test(control.value)) {
          errors.push('a lowercase letter');
        }
        if (!/[0-9]/.test(control.value)) {
          errors.push('a number');
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/.test(control.value)) {
          errors.push('a symbol');
        }
        resolve({ 'passwordStrength': errors.join(', ') });
      } else {
        resolve(null);
      }
    });
  }

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.http.post('https://dainty-scarf-production.up.railway.app/api/auth/register', formData, {
        headers: new HttpHeaders({'Content-Type': 'application/json'}) 
      })
        .subscribe(
          response => {
            console.log('Registration successful:', response);
            alert("Registration successful.")
            this.registerForm.reset();
            this.router.navigate(['/signin']);
          },
          error => { 
            console.error('Registration failed:', error);
    
            if (error.status === 400) {
                alert('Registration failed: Bad Request. Please check your details.'); 
            } else if (error.status === 409) {
                alert('Registration failed: Username or email already exists.'); 
            } else {
                alert(`Registration failed. Error: ${error.statusText}`);
            }
        }
        );
    }
  }
}