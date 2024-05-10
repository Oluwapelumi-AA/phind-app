import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Filtertab = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { label: 'Assistant Project Manager', value: 'Assistant Project Manager' },
    { label: 'Building Services', value: 'category2' },
    { label: 'Construction Assistant', value: 'category3' },
    { label: 'Drywall Installer', value: 'category4' },
    { label: 'Electrician', value: 'category5' },
    { label: 'Plumber', value: 'category6' },
  ];

  const vacancyTypes = [
    { label: 'Full-time', value: 'full-time' },
    { label: 'Intern', value: 'intern' },
    { label: 'Part-time', value: 'part-time' },
    { label: 'Seasonal', value: 'seasonal' },
  ];

  const [selectedVacancyTypes, setSelectedVacancyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([460, 2000]);

  const handleVacancyTypeSelection = (value) => {
    if (selectedVacancyTypes.includes(value)) {
      setSelectedVacancyTypes(selectedVacancyTypes.filter((type) => type !== value));
    } else {
      setSelectedVacancyTypes([...selectedVacancyTypes, value]);
    }
  };

  const priceRangeChange = (values) => {
    setPriceRange(values);
  };

  return (
    <View style={styles.filterWrapper}>
      <View style={styles.innerSection}>
        <View style={styles.firstLine}>
          <View style={styles.filterIconAndText}>
            <MaterialIcons name="tune" style={styles.mainIcon} />
            <Text style={styles.filterText}>Filter</Text>
          </View>
          <View style={styles.resetTextWrapper}>
            <Text style={styles.resetText}>Reset</Text>
          </View>
        </View>

        {/* Category Section */}
        <View style={styles.categorySection}>
          <Text style={styles.title}>Category</Text>
          <DropDownPicker
            items={categories}
            defaultValue={selectedCategory}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            dropDownStyle={styles.dropdownList}
            onChangeItem={(item) => setSelectedCategory(item.value)}
          />
        </View>

        {/* Vacancy Type Section */}
        <View style={styles.vacancyTypeSection}>
          <Text style={styles.title}>Vacancy Type</Text>
          {vacancyTypes.map((type) => (
            <View style={styles.checkboxContainer} key={type.value}>
              <CheckBox
                value={selectedVacancyTypes.includes(type.value)}
                onValueChange={() => handleVacancyTypeSelection(type.value)}
              />
              <Text style={styles.labelText}>{type.label}</Text>
            </View>
          ))}
        </View>

        {/* Price Range Section */}
        <View style={styles.priceRangeSection}>
          <Text style={styles.title}>Price Range</Text>
          <MultiSlider
            values={priceRange}
            min={460}
            max={2000}
            step={10}
            sliderLength={300}
            onValuesChange={priceRangeChange}
            allowOverlap={false}
            snapped
            selectedStyle={{ backgroundColor: '#FDBC5B' }}
            markerStyle={{ backgroundColor: '#FDBC5B' }}
            trackStyle={{ backgroundColor: '#E0E0E0' }}
          />
          <View style={styles.rangeTextContainer}>
            <Text style={styles.rangeText}>${priceRange[0]}</Text>
            <Text style={styles.rangeText}>${priceRange[1]}</Text>
          </View>
        </View>

        {/* Custom Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Button pressed')}>
            <Text style={styles.buttonText}>Show Result</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterWrapper: {
    flex: 1,
    height: 674,
  },
  innerSection: {
    width: 337.88,
    height: 674,
    marginTop: 54,
    alignSelf: 'center',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterIconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainIcon: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    color: '#072A44',
    marginRight: 10,
  },
  filterText: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    color: '#072A44',
  },
  resetTextWrapper: {
    width: 37,
    height: 25,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    color: '#072A44',
  },
  title: {
    fontSize: 16.5,
    fontWeight: '500',
    lineHeight: 24.26,
    letterSpacing: -0.45,
    color: '#072A44',
    marginTop: 10,
    marginBottom: 10,
  },
  categorySection: {
    marginTop: 20,
  },
  vacancyTypeSection: {
    marginTop: 20,
  },
  priceRangeSection: {
    marginTop: 20,
  },
  dropdownContainer: {
    height: 40,
    marginTop: 8,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownList: {
    backgroundColor: '#fafafa',
    maxHeight: 150,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16.5,
    fontWeight: '500',
    lineHeight: 24.26,
    color: '#B0B0B0',
    padding: 7,
  },
  rangeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rangeText: {
    fontSize: 16.5,
    fontWeight: '500',
    lineHeight: 24.26,
    color: '#B0B0B0',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: 337.88,
    backgroundColor: '#FDBC5B',
    paddingTop: 14.59,
    paddingRight: 134,
    paddingBottom: 14.59,
    paddingLeft: 134,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    width: 111,
    height: 20,
    fontSize: 16.67,
    fontWeight: '500',
    lineHeight: 19.55,
    color: '#fff',
    alignItems: 'center',
  },
});

export default Filtertab;


