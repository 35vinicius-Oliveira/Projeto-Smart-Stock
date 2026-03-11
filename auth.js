// Supabase configuration
// Get environment variables or fallback to hardcoded strings (backward compatibility)
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || "https://inbidonghnbvcuozpjvo.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || "sb_publishable_mmKYgdhPQno1Zh1YQH-yRQ_9RNgiU_n";

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth helper functions
const auth = {
    // Sign up a new user
    async signUp(email, password, fullName) {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });

        if (error) throw error;
        return data;
    },

    // Sign in an existing user
    async signIn(email, password) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },



    // Sign out user
    async signOut() {
        const { error } = await supabaseClient.auth.signOut();
        if (!error) {
            window.location.href = "login.html";
        }
        return { error };
    },

    // Get current session
    async getSession() {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        return { session, error };
    },

    // Check auth status on protected pages
    async checkAuth() {
        const { session } = await this.getSession();
        if (!session && !window.location.pathname.includes("login.html") && !window.location.pathname.includes("signup.html")) {
            window.location.href = "login.html";
        }
        return session;
    }
};

// Global export
window.auth = auth;

// DOM Interaction logic
document.addEventListener("DOMContentLoaded", () => {
    // Login logic
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            loginBtn.disabled = true;
            loginBtn.innerText = "Carregando...";
            
            const { data, error } = await auth.signIn(email, password);
            
            if (error) {
                alert("Erro ao entrar: " + error.message);
                loginBtn.disabled = false;
                loginBtn.innerText = "ACESSAR SISTEMA";
            } else {
                window.location.href = "index.html";
            }
        });
    }



    // Signup logic
    const signupBtn = document.getElementById("signup-btn");
    if (signupBtn) {
        signupBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            const name = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            
            signupBtn.disabled = true;
            signupBtn.innerText = "Criando...";
            
            try {
                const data = await auth.signUp(email, password, name);
                if (data.session) {
                    alert("Cadastro realizado com sucesso! Redirecionando...");
                    window.location.href = "index.html";
                } else {
                    alert("Cadastro realizado! Verifique seu e-mail se necessário ou faça login.");
                    window.location.href = "login.html";
                }
            } catch (error) {
                alert("Erro ao cadastrar: " + error.message);
                signupBtn.disabled = false;
                signupBtn.innerText = "CRIAR CONTA";
            }
        });
    }

    // Logout logic
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async () => {
            if (confirm("Deseja realmente sair?")) {
                await auth.signOut();
            }
        });
    }

    // Check auth for non-auth pages
    auth.checkAuth();
});
