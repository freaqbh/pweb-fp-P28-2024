<template>
    <div class="dashboard">
        <div class="user-info">
            <h2>User Dashboard</h2>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
        </div>
        <div class="catalog">
            <h3>Crowdfund Catalog:</h3>
            <div class="crowdfund">
                <h4>Save the Rainforest</h4>
                <p><strong>Target:</strong> $50,000</p>
                <p><strong>Status:</strong> Ongoing</p>
                <router-link to="/crowdfund/test">
                    <button>Donate</button>
                </router-link>
                
            </div>
        </div>
    </div>
</template>