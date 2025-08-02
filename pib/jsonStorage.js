const jsonStorage = {
    async getItem(key) {
        try {
            const res = await fetch(`http://localhost/${projectName}/pib/json-storage.php?key=${encodeURIComponent(key)}`);
            const data = await res.json();
            return data.value ?? null;
        } catch (error) {
            console.error('Error getting item:', error);
            return null;
        }
    },
    async setItem(key, value) {
        try {
            const res = await fetch(`http://localhost/${projectName}/pib/json-storage.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value }),
            });
            const result = await res.json();
            return result.success === true;
        } catch (error) {
            console.error('Error setting item:', error);
            return false;
        }
    }
};
