"strict"

function showError(msg)
{
    const e = document.getElementById("error-msg");
    e.classList.remove("no-show")
    e.innerHTML=msg
    e.classList.remove("shake")
    setTimeout(() => {e.classList.add("shake")}, 100)
}

checks=[
    {
        check: function(pwd) {
            return pwd.split('').some(c => c >= 'a' && c <= 'z') 
        },
        msg: "Password must contain at least one lower case character."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => c >= 'A' && c <= 'Z') 
        },
        msg: "Password must have upper case characters."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => c >= '0' && c <= '9') 
        },
        msg: "Password must contain numbers."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => ['#','_','-','+','/','\\','<','>'].includes(c)) 
        },
        msg: "Password must contain special characters."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => ['.',',',';',':','!','?'].includes(c)) 
        },
        msg: "Password must contain punctuations."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => ['$','€','£','¥'].includes(c))
        },
        msg: "Password have at least one currency symbol."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => (c >= 'Α' && c <= 'Ω') || (c >= 'α' && c <= 'ω'))
        },
        msg: "Password must contain a greek letter."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => c == 'ß')
        },
        msg: "Password must contain German double s."
    },
    {
        check: function(pwd) {
            return pwd.split('').some(c => ['å','Å','ö','Ö','ä','Ä','ø','Ø','æ','Æ'].includes(c))
        },
        msg: "Password must have scandinavic letters."
    },
    {
        check: function(pwd) {
            return pwd.length >= 32
        },
        msg: "Password must have at least 32 characters."
    },
    {
        check: function(pwd) {
            for(i=0;i<pwd.length-1;i++) {
                if (pwd[i] == pwd[i+1]) return false
            }
            return true
        },
        msg: "Password must not have repeat characters."
    },
    {
        check: function(pwd) {
            f={}
            for(i=0;i<pwd.length;i++) {
                f[pwd[i]] = 1 + (f[pwd[i]] || 0)
            }
            for (k in f) {
                if (f[k] > 2) return false
            }
            return true
        },
        msg: "Each character can appear at most twice in the password."
    },
]

function checkPassword(pwd)
{
    for(const chk of checks) {
        if (!chk.check(pwd)) {
            return chk.msg
        }
    }
}

function registerUser()
{
    const username = document.getElementById("user-name").value
    const pwd1 = document.getElementById("password").value
    const pwd2 = document.getElementById("password2").value

    // Clear password fields for maximum annoyance.
    document.getElementById("password").value=""
    document.getElementById("password2").value=""

    if (!username) {
        showError("Please input a user name")
    } else if (!pwd1) {
        showError("Please input a valid password")
    } else if (pwd1 != pwd2) {
        showError("Those passwords didn't match. Try again!")
    } else if (chk=checkPassword(pwd1)) {
        showError(chk)
    } else {
        showError("System Error 418 - Unable to register User Account at this time. Please try again.")
    }
}
